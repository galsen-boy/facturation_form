import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Box, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface FormData {
  nom: string;
  prenom: string;
  coordonnees: string;
  dateNaissance: Date | null;
  lieuNaissance: string;
  adresse: string;
  profession: string;
  numeroCNI: string;
  numeroPermis: string;
  numeroImmatriculation: string;
  marqueVehicule: string;
  typeVehicule: string;
  dateDepart: Date | null;
  heureDepart: Date | null;
  dateRetour: Date | null;
  heureRetour: Date | null;
  lieuLivraison: string;
  lieuRecuperation: string;
  destination: string;
  kmDepart: number;
  kmArrivee: number;
  prixJour: number;
  prixKm: number;
  conducteurAdditionnel: string;
  coordonneesConducteur: string;
  modePaiement: string;
  netAPayer: number;
  caution: number;
  carburant: string;
}

interface ContratPDFProps {
  formData: FormData;
}

const ContratPDF: React.FC<ContratPDFProps> = ({ formData }) => {
  const { toPDF, targetRef } = usePDF({ filename: 'contrat-location.pdf' });

  const formatDate = (date: Date | null) => {
    if (!date) return 'Non spécifié';
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return 'Non spécifié';
    return format(date, 'HH:mm', { locale: fr });
  };

  const calculateTotal = () => {
    if (!formData.dateRetour || !formData.dateDepart) return 0;
    const days = Math.ceil(
      (formData.dateRetour.getTime() - formData.dateDepart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const km = formData.kmArrivee - formData.kmDepart;
    return days * formData.prixJour + km * formData.prixKm;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box ref={targetRef} sx={{ p: 4, backgroundColor: 'white' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contrat de Location de Véhicule
        </Typography>

        <Typography variant="h6" gutterBottom>
          Informations du locataire
        </Typography>
        <Typography>
          Nom: {formData.nom} {formData.prenom}
        </Typography>
        <Typography>Coordonnées: {formData.coordonnees}</Typography>
        <Typography>
          Date de naissance: {formatDate(formData.dateNaissance)} à {formData.lieuNaissance}
        </Typography>
        <Typography>Adresse: {formData.adresse}</Typography>
        <Typography>Profession: {formData.profession}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Documents
        </Typography>
        <Typography>Numéro CNI: {formData.numeroCNI}</Typography>
        <Typography>Numéro de permis: {formData.numeroPermis}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Véhicule
        </Typography>
        <Typography>Numéro d'immatriculation: {formData.numeroImmatriculation}</Typography>
        <Typography>Marque: {formData.marqueVehicule}</Typography>
        <Typography>Type: {formData.typeVehicule}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Détails de la location
        </Typography>
        <Typography>
          Date de départ: {formatDate(formData.dateDepart)} à {formatTime(formData.heureDepart)}
        </Typography>
        <Typography>
          Date de retour: {formatDate(formData.dateRetour)} à {formatTime(formData.heureRetour)}
        </Typography>
        <Typography>Lieu de livraison: {formData.lieuLivraison}</Typography>
        <Typography>Lieu de récupération: {formData.lieuRecuperation}</Typography>
        <Typography>Destination: {formData.destination}</Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Kilométrage et prix
        </Typography>
        <Typography>Kilométrage de départ: {formData.kmDepart} km</Typography>
        <Typography>Kilométrage d'arrivée: {formData.kmArrivee} km</Typography>
        <Typography>Prix par jour: {formData.prixJour} €</Typography>
        <Typography>Prix par km: {formData.prixKm} €</Typography>

        {formData.conducteurAdditionnel && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Conducteur additionnel
            </Typography>
            <Typography>Nom: {formData.conducteurAdditionnel}</Typography>
            <Typography>Coordonnées: {formData.coordonneesConducteur}</Typography>
          </>
        )}

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Paiement
        </Typography>
        <Typography>Mode de paiement: {formData.modePaiement}</Typography>
        <Typography>Net à payer: {calculateTotal()} €</Typography>
        <Typography>Caution: {formData.caution} €</Typography>
        <Typography>Carburant: {formData.carburant}</Typography>

        <Box sx={{ mt: 4, borderTop: '1px solid black', pt: 2 }}>
          <Typography>Signature du locataire:</Typography>
          <Box sx={{ height: 100 }} />
          <Typography>Signature du loueur:</Typography>
          <Box sx={{ height: 100 }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => toPDF()}>
          Télécharger le PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ContratPDF; 