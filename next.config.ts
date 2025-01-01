import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  images: {
    remotePatterns: [
      {
        protocol: 'https',              // Le protocole de l'image
        hostname: 'res.cloudinary.com', // Le domaine de Cloudinary
        pathname: '/**',                // Le chemin d'accès aux images (optionnel, ici il autorise tous les chemins sous ce domaine)
      },
    ],
  },



};

export default nextConfig;
