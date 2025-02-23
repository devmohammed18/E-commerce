import path from 'path';
import fs from 'fs/promises';

import { NextResponse } from 'next/server'; // Utilisation de NextResponse
import * as XLSX from 'xlsx'; // Import de la bibliothèque xlsx

export async function GET() {
  try {
    // Utiliser process.cwd() pour obtenir le chemin absolu du projet
    const filePath = path.join(process.cwd(), 'data', 'fraislivraison.xlsx');
    
    // Vérifier si le fichier existe
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
    }

    // Lire le fichier
    const fileBuffer = await fs.readFile(filePath);
    
    // Parser le fichier Excel
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[1]]; // Première feuille
    
    // Convertir en JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Ajouter des logs pour le débogage en production
    console.log('Lecture du fichier réussie, nombre de lignes:', jsonData.length);
    
    return NextResponse.json(jsonData);
    
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la lecture du fichier Excel',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }

}


// try {
//   // Chemin absolu vers votre fichier Excel dans le dossier public
//   const filePath = path.resolve('public', 'fraislivraison.xlsx');
//   console.log('filePath------------------------------------->',filePath)
//   // Vérifiez si le fichier existe
//   const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

//   if (!fileExists) {
//     return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
//   }

//   // Lire le fichier Excel avec fs.promises.readFile
//   const fileBuffer = await fs.readFile(filePath);

//   // Utiliser xlsx pour analyser le fichier Excel
//   const workbook = XLSX.read(fileBuffer, { type: 'buffer' }); // Lire le buffer avec xlsx
//   const sheetNames = workbook.SheetNames; // Obtenir les noms des feuilles
//   const sheet = workbook.Sheets[sheetNames[1]]; // Prendre la première feuille

//   // Convertir la feuille en JSON
//   const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Utiliser header: 1 pour garder les données de la première ligne comme clés
//   console.log('jsonData---------------------------->',jsonData)
//   // Retourner les données Excel sous forme de JSON
//   return NextResponse.json(jsonData);

// } catch (error) {
//   // Si une erreur se produit, renvoyer un message d'erreur
//   return NextResponse.json({ error: 'Une erreur est survenue lors de la lecture du fichier Excel', details: (error as Error).message }, { status: 500 });
// }