import path from 'path';
import fs from 'fs/promises';

import { NextResponse } from 'next/server'; // Utilisation de NextResponse
import * as XLSX from 'xlsx'; // Import de la bibliothèque xlsx

export async function GET() {
  try {
    // Chemin absolu vers votre fichier Excel dans le dossier public
    const filePath = path.resolve('public', 'fraislivraison.xlsx');

    // Vérifiez si le fichier existe
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
    }

    // Lire le fichier Excel avec fs.promises.readFile
    const fileBuffer = await fs.readFile(filePath);

    // Utiliser xlsx pour analyser le fichier Excel
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' }); // Lire le buffer avec xlsx
    const sheetNames = workbook.SheetNames; // Obtenir les noms des feuilles
    const sheet = workbook.Sheets[sheetNames[1]]; // Prendre la première feuille

    // Convertir la feuille en JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Utiliser header: 1 pour garder les données de la première ligne comme clés

    // Retourner les données Excel sous forme de JSON
    return NextResponse.json(jsonData);

  } catch (error) {
    // Si une erreur se produit, renvoyer un message d'erreur
    return NextResponse.json({ error: 'Une erreur est survenue lors de la lecture du fichier Excel', details: (error as Error).message }, { status: 500 });
  }
}
