import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Box, Button, Typography, Divider, Grid } from '@mui/material';
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
  const { toPDF, targetRef } = usePDF({ filename: `${formData.prenom} ${formData.nom} - Contrat de location.pdf` });

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
      <Box 
        ref={targetRef} 
        sx={{ 
          p: 3, 
          backgroundColor: 'white',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}
      >
        {/* En-tête avec logo */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img 
            src="/assets/logo.jpg" 
            alt="Logo" 
            style={{ 
              maxWidth: '150px',
              marginBottom: '10px'
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: '#1a237e',
              mb: 1,
              fontSize: '1.5rem'
            }}
          >
            Contrat de Location de Véhicule
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#666', fontSize: '0.8rem' }}>
            RC: SN-DKR-2017-A-10766 ---- NINEA: 006358859
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#666', fontSize: '0.8rem' }}>
            Tel: +221 33 827 17 66 // 77 264 06 02 // 77 731 03 03
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Informations du locataire */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Informations du locataire
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Nom complet:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.prenom} {formData.nom}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Coordonnées:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.coordonnees}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date et lieu de naissance:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formatDate(formData.dateNaissance)} à {formData.lieuNaissance}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Adresse:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.adresse}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Profession:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.profession}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Documents */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Documents
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Numéro CNI:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.numeroCNI}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Numéro de permis:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.numeroPermis}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Véhicule */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Véhicule
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Numéro d'immatriculation:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.numeroImmatriculation}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Marque:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.marqueVehicule}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Type:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.typeVehicule}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Détails de la location */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Détails de la location
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date et heure de départ:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formatDate(formData.dateDepart)} à {formatTime(formData.heureDepart)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Date et heure de retour:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formatDate(formData.dateRetour)} à {formatTime(formData.heureRetour)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Lieu de livraison:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.lieuLivraison}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Lieu de récupération:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.lieuRecuperation}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Destination:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.destination}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Kilométrage et prix */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Kilométrage et prix
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Kilométrage de départ:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.kmDepart} km</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Kilométrage d'arrivée:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.kmArrivee} km</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Prix par jour:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.prixJour.toLocaleString('fr-FR')} FCFA</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Prix par km:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.prixKm.toLocaleString('fr-FR')} FCFA</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Conducteur additionnel */}
        {formData.conducteurAdditionnel && (
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              Conducteur additionnel
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Nom:</Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>{formData.conducteurAdditionnel}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Coordonnées:</Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>{formData.coordonneesConducteur}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Paiement */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1a237e',
              borderBottom: '2px solid #1a237e',
              pb: 0.5,
              mb: 1,
              fontSize: '1.1rem'
            }}
          >
            Paiement
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Mode de paiement:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.modePaiement}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Net à payer:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{calculateTotal().toLocaleString('fr-FR')} FCFA</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Caution:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.caution.toLocaleString('fr-FR')} FCFA</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Carburant:</Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{formData.carburant}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Signatures */}
        <Box sx={{ mt: 3, borderTop: '1px solid #ccc', pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>Signature du locataire:</Typography>
              <Box sx={{ height: 60, borderBottom: '1px dashed #666' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>Signature du loueur:</Typography>
              <Box sx={{ height: 60, borderBottom: '1px dashed #666' }} />
            </Grid>
          </Grid>
        </Box>

        {/* Date du contrat */}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>
            Fait à _________________, le {formatDate(new Date())}
          </Typography>
        </Box>

        {/* Conditions Générales */}
        <Box sx={{ mt: 4, pageBreakBefore: 'always' }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: '#1a237e',
              mb: 2,
              fontSize: '1.5rem',
              textAlign: 'center'
            }}
          >
            CONDITIONS GÉNÉRALES
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 1 : CONDITIONS À REMPLIR POUR UN VÉHICULE
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Sauf exception indiquée ci-après. Tout conducteur doit être âgé d'au moins 21 ans et être titulaire d'un permis de
              conduire en cours de validité et correspondant à la catégorie de véhicule souhaitée. Depuis au moins 1 AN. Il doit livrer
              la photocopie de sa carte d'identité, passeport, carte bancaire ou chèque et une caution fixée par IMO AUTOMOBILE à
              titre de garantie.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 2 : TITULAIRE DU CONTRAT DE LOCATION ET CONDUCTEUR AUTORISÉ
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Le nom du locataire indiqué sur le contrat de location est celui du conducteur principal qui doit être présent lors de la
              signature du contrat de location et à qui sont facturés les frais liés à la livraison. Vous pouvez autoriser d'autres
              conducteurs sur le contrat en communiquant leurs noms au contracteur additionnel. En cas de dommage causé au
              véhicule lors de sa conduite par un conducteur non-indiqué sur le contrat, le client sera entièrement responsable. Et
              vous devez indemniser IMO AUTOMOBILE de l'intégralité des dommages subis par le véhicule et d'une amende de 500
              000 F CFA (Cinq Cent Mille Francs CFA) représentant les frais d'immobilisations.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 3 : ÉTAT DU VÉHICULE
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Le véhicule est livré à son état d'entretien général, avec le carburant. Le locataire aura à sa charge la consommation de
              carburant pendant la location. Le remplissage du réservoir lors de la restitution du véhicule au même niveau de
              carburant fourni à début de la location.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 4 : CONDUITE
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Vous êtes le gardien juridique du véhicule à compter de la livraison, vous en êtes dès lors responsable. Vous vous
              engagez à :
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1, pl: 2 }}>
              1. Conduire un véhicule en bon père de famille.<br />
              2. Respecter scrupuleusement le code de la route.<br />
              3. Utiliser le véhicule sur des routes carrossables avec une mauvaise appréciation du gabarit du véhicule, circulation en
              sens interdit, excès de vitesse, refus de priorité, stationnement interdit, surcharge du véhicule, conduite en état
              d'ivresse, etc.<br />
              4. Il est formellement interdit d'utiliser le véhicule à des fins commerciales, de transport de personnes (ex taxi) de
              marchandises (hors contrat signé), ou d'apprentissage à la conduite.<br />
              5. Il est interdit d'utiliser le véhicule pour les courses ou compétitions sportives automobiles (ou les essais) ou en
              sous-location.<br />
              6. Il est strictement interdit sous l'influence des spiritueux ou de narcotiques, ou de drogues ou stupéfiants non prescrits
              médicalement.<br /><br />
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 5 : SÉCURITÉ
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Vous vous engagez à respecter les conditions de sécurité fixées par la réglementation, en particulier la capacité
              maximale spécifique à chaque véhicule quant au nombre d'occupants et/ou au poids des bagages ou marchandises
              transportés (charge utile s'agissant des véhicules utilitaires).
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Au cours de la location et tous les 5.000 kilomètres parcourus, vous engagez à faire les contrôles d'usage du véhicule
              (niveau d'eau, niveau d'huile moteur ou ad blue ...) de 1.000 km pour les véhicules de tourisme/au-delà de 500 km pour
              les véhicules utilitaires, sans quoi des pénalités vous seront facturées.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 6 : PANNES ACCIDENTS ET VOLS
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              En cas de panne du véhicule nécessitant des réparations immédiates ou urgentes avant de faire procéder à toute
              réparation (y compris s'agissant des pneumatiques) prenez contact avec le service client. Le locataire est tenu au
              paiement de toute réparation s'avérant nécessaire au cours de la location. Les diagnostics mécaniques, électriques et
              autres seront effectués par nos partenaires et les facturations seront payées par le client.
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Les constats d'accident de la circulation doivent mentionner le bailleur après avoir fait dresser au besoin à ses frais tous
              procès-verbaux de Police ou de Gendarmerie.
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              En cas de panne, le véhicule reste sous la garde du client sauf retour en agence. Le client supportera toutes les
              réparations dues à l'accident facturable par le représentant tant concessionnaire ou le mandataire du véhicule. En cas
              de vol, la plainte et la déclaration doivent être faites immédiatement. Le client sera entièrement tenu responsable et devra
              rembourser IMO AUTOMOBILE intégralement sous un délai fixé par la direction.
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1a237e',
                borderBottom: '2px solid #1a237e',
                pb: 0.5,
                mb: 1,
                fontSize: '1.1rem'
              }}
            >
              ARTICLE 7 : INDEMNITÉS DE RETARD
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
              Le client doit remettre la voiture à l'heure mentionnée sur le contrat une marge de 60 minutes lui est accordée.
              Expiré ce délai le client devra indemniser IMO AUTOMOBILE du retard comblé en payant un montant de 250 francs
              CFA par minute.
            </Typography>
          </Box>

          {/* Signatures pour les conditions générales */}
          <Box sx={{ mt: 3, borderTop: '1px solid #ccc', pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>Signature du locataire:</Typography>
                <Box sx={{ height: 60, borderBottom: '1px dashed #666' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 'bold', mb: 1, fontSize: '0.9rem' }}>Signature du loueur:</Typography>
                <Box sx={{ height: 60, borderBottom: '1px dashed #666' }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => toPDF()}
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Télécharger le PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ContratPDF; 