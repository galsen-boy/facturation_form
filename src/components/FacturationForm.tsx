import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import ContratPDF from './ContratPDF';

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

const validationSchema = yup.object({
  nom: yup.string().required('Le nom est requis'),
  prenom: yup.string().required('Le prénom est requis'),
  coordonnees: yup.string().required('Les coordonnées sont requises'),
  dateNaissance: yup.date().required('La date de naissance est requise'),
  lieuNaissance: yup.string().required('Le lieu de naissance est requis'),
  adresse: yup.string().required('L\'adresse est requise'),
  profession: yup.string().required('La profession est requise'),
  numeroCNI: yup.string().required('Le numéro CNI est requis'),
  numeroPermis: yup.string().required('Le numéro de permis est requis'),
  numeroImmatriculation: yup.string().required('Le numéro d\'immatriculation est requis'),
  marqueVehicule: yup.string().required('La marque du véhicule est requise'),
  typeVehicule: yup.string().required('Le type de véhicule est requis'),
  dateDepart: yup.date().required('La date de départ est requise'),
  heureDepart: yup.date().required('L\'heure de départ est requise'),
  dateRetour: yup.date()
    .required('La date de retour est requise')
    .test('date-retour', 'La date de retour doit être ultérieure à la date de départ', function(value) {
      const { dateDepart } = this.parent;
      if (!dateDepart || !value) return true;
      return value > dateDepart;
    }),
  heureRetour: yup.date().required('L\'heure de retour est requise'),
  lieuLivraison: yup.string().required('Le lieu de livraison est requis'),
  lieuRecuperation: yup.string().required('Le lieu de récupération est requis'),
  destination: yup.string().required('La destination est requise'),
  kmDepart: yup.number().required('Le kilométrage de départ est requis'),
  kmArrivee: yup.number().required('Le kilométrage d\'arrivée est requis'),
  prixJour: yup.number().required('Le prix par jour est requis'),
  prixKm: yup.number().required('Le prix par km est requis'),
  conducteurAdditionnel: yup.string(),
  coordonneesConducteur: yup.string(),
  modePaiement: yup.string().required('Le mode de paiement est requis'),
  netAPayer: yup.number().required('Le net à payer est requis'),
  caution: yup.number().required('La caution est requise'),
  carburant: yup.string().required('Le carburant est requis'),
});

const FacturationForm = () => {
  const [showPDF, setShowPDF] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData | null>(null);

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      coordonnees: '',
      dateNaissance: null,
      lieuNaissance: '',
      adresse: '',
      profession: '',
      numeroCNI: '',
      numeroPermis: '',
      numeroImmatriculation: '',
      marqueVehicule: '',
      typeVehicule: '',
      dateDepart: null,
      heureDepart: null,
      dateRetour: null,
      heureRetour: null,
      lieuLivraison: '',
      lieuRecuperation: '',
      destination: '',
      kmDepart: 0,
      kmArrivee: 0,
      prixJour: 0,
      prixKm: 0,
      conducteurAdditionnel: '',
      coordonneesConducteur: '',
      modePaiement: '',
      netAPayer: 0,
      caution: 0,
      carburant: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setFormData(values);
      setShowPDF(true);
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      {showPDF && formData ? (
        <ContratPDF formData={formData} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Informations personnelles */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informations personnelles
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="nom"
                name="nom"
                label="Nom"
                value={formik.values.nom}
                onChange={formik.handleChange}
                error={formik.touched.nom && Boolean(formik.errors.nom)}
                helperText={formik.touched.nom && formik.errors.nom}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="prenom"
                name="prenom"
                label="Prénom"
                value={formik.values.prenom}
                onChange={formik.handleChange}
                error={formik.touched.prenom && Boolean(formik.errors.prenom)}
                helperText={formik.touched.prenom && formik.errors.prenom}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="coordonnees"
                name="coordonnees"
                label="Coordonnées"
                value={formik.values.coordonnees}
                onChange={formik.handleChange}
                error={formik.touched.coordonnees && Boolean(formik.errors.coordonnees)}
                helperText={formik.touched.coordonnees && formik.errors.coordonnees}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date de naissance"
                value={formik.values.dateNaissance}
                onChange={(newValue: Date | null) => formik.setFieldValue('dateNaissance', newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.dateNaissance && Boolean(formik.errors.dateNaissance),
                    helperText: formik.touched.dateNaissance && formik.errors.dateNaissance
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lieuNaissance"
                name="lieuNaissance"
                label="Lieu de naissance"
                value={formik.values.lieuNaissance}
                onChange={formik.handleChange}
                error={formik.touched.lieuNaissance && Boolean(formik.errors.lieuNaissance)}
                helperText={formik.touched.lieuNaissance && formik.errors.lieuNaissance}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="adresse"
                name="adresse"
                label="Adresse"
                value={formik.values.adresse}
                onChange={formik.handleChange}
                error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                helperText={formik.touched.adresse && formik.errors.adresse}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="profession"
                name="profession"
                label="Profession"
                value={formik.values.profession}
                onChange={formik.handleChange}
                error={formik.touched.profession && Boolean(formik.errors.profession)}
                helperText={formik.touched.profession && formik.errors.profession}
              />
            </Grid>

            {/* Documents */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="numeroCNI"
                name="numeroCNI"
                label="Numéro CNI"
                value={formik.values.numeroCNI}
                onChange={formik.handleChange}
                error={formik.touched.numeroCNI && Boolean(formik.errors.numeroCNI)}
                helperText={formik.touched.numeroCNI && formik.errors.numeroCNI}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="numeroPermis"
                name="numeroPermis"
                label="Numéro de permis"
                value={formik.values.numeroPermis}
                onChange={formik.handleChange}
                error={formik.touched.numeroPermis && Boolean(formik.errors.numeroPermis)}
                helperText={formik.touched.numeroPermis && formik.errors.numeroPermis}
              />
            </Grid>

            {/* Véhicule */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Véhicule
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="numeroImmatriculation"
                name="numeroImmatriculation"
                label="Numéro d'immatriculation"
                value={formik.values.numeroImmatriculation}
                onChange={formik.handleChange}
                error={formik.touched.numeroImmatriculation && Boolean(formik.errors.numeroImmatriculation)}
                helperText={formik.touched.numeroImmatriculation && formik.errors.numeroImmatriculation}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="marqueVehicule"
                name="marqueVehicule"
                label="Marque du véhicule"
                value={formik.values.marqueVehicule}
                onChange={formik.handleChange}
                error={formik.touched.marqueVehicule && Boolean(formik.errors.marqueVehicule)}
                helperText={formik.touched.marqueVehicule && formik.errors.marqueVehicule}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="typeVehicule"
                name="typeVehicule"
                label="Type de véhicule"
                value={formik.values.typeVehicule}
                onChange={formik.handleChange}
                error={formik.touched.typeVehicule && Boolean(formik.errors.typeVehicule)}
                helperText={formik.touched.typeVehicule && formik.errors.typeVehicule}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date de départ"
                value={formik.values.dateDepart}
                onChange={(newValue: Date | null) => formik.setFieldValue('dateDepart', newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.dateDepart && Boolean(formik.errors.dateDepart),
                    helperText: formik.touched.dateDepart && formik.errors.dateDepart
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Heure de départ"
                value={formik.values.heureDepart}
                onChange={(newValue: Date | null) => formik.setFieldValue('heureDepart', newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.heureDepart && Boolean(formik.errors.heureDepart),
                    helperText: formik.touched.heureDepart && formik.errors.heureDepart
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date de retour"
                value={formik.values.dateRetour}
                onChange={(newValue: Date | null) => formik.setFieldValue('dateRetour', newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.dateRetour && Boolean(formik.errors.dateRetour),
                    helperText: formik.touched.dateRetour && formik.errors.dateRetour
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Heure de retour"
                value={formik.values.heureRetour}
                onChange={(newValue: Date | null) => formik.setFieldValue('heureRetour', newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.heureRetour && Boolean(formik.errors.heureRetour),
                    helperText: formik.touched.heureRetour && formik.errors.heureRetour
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lieuLivraison"
                name="lieuLivraison"
                label="Lieu de livraison"
                value={formik.values.lieuLivraison}
                onChange={formik.handleChange}
                error={formik.touched.lieuLivraison && Boolean(formik.errors.lieuLivraison)}
                helperText={formik.touched.lieuLivraison && formik.errors.lieuLivraison}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lieuRecuperation"
                name="lieuRecuperation"
                label="Lieu de récupération"
                value={formik.values.lieuRecuperation}
                onChange={formik.handleChange}
                error={formik.touched.lieuRecuperation && Boolean(formik.errors.lieuRecuperation)}
                helperText={formik.touched.lieuRecuperation && formik.errors.lieuRecuperation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="destination"
                name="destination"
                label="Destination"
                value={formik.values.destination}
                onChange={formik.handleChange}
                error={formik.touched.destination && Boolean(formik.errors.destination)}
                helperText={formik.touched.destination && formik.errors.destination}
              />
            </Grid>

            {/* Kilométrage et prix */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Kilométrage et prix
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="kmDepart"
                name="kmDepart"
                label="Kilométrage de départ"
                value={formik.values.kmDepart}
                onChange={formik.handleChange}
                error={formik.touched.kmDepart && Boolean(formik.errors.kmDepart)}
                helperText={formik.touched.kmDepart && formik.errors.kmDepart}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="kmArrivee"
                name="kmArrivee"
                label="Kilométrage d'arrivée"
                value={formik.values.kmArrivee}
                onChange={formik.handleChange}
                error={formik.touched.kmArrivee && Boolean(formik.errors.kmArrivee)}
                helperText={formik.touched.kmArrivee && formik.errors.kmArrivee}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="prixJour"
                name="prixJour"
                label="Prix par jour"
                value={formik.values.prixJour}
                onChange={formik.handleChange}
                error={formik.touched.prixJour && Boolean(formik.errors.prixJour)}
                helperText={formik.touched.prixJour && formik.errors.prixJour}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="prixKm"
                name="prixKm"
                label="Prix par km"
                value={formik.values.prixKm}
                onChange={formik.handleChange}
                error={formik.touched.prixKm && Boolean(formik.errors.prixKm)}
                helperText={formik.touched.prixKm && formik.errors.prixKm}
              />
            </Grid>

            {/* Conducteur additionnel */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Conducteur additionnel
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="conducteurAdditionnel"
                name="conducteurAdditionnel"
                label="Nom du conducteur additionnel"
                value={formik.values.conducteurAdditionnel}
                onChange={formik.handleChange}
                error={formik.touched.conducteurAdditionnel && Boolean(formik.errors.conducteurAdditionnel)}
                helperText={formik.touched.conducteurAdditionnel && formik.errors.conducteurAdditionnel}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="coordonneesConducteur"
                name="coordonneesConducteur"
                label="Coordonnées du conducteur additionnel"
                value={formik.values.coordonneesConducteur}
                onChange={formik.handleChange}
                error={formik.touched.coordonneesConducteur && Boolean(formik.errors.coordonneesConducteur)}
                helperText={formik.touched.coordonneesConducteur && formik.errors.coordonneesConducteur}
              />
            </Grid>

            {/* Paiement */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Paiement
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                id="modePaiement"
                name="modePaiement"
                label="Mode de paiement"
                value={formik.values.modePaiement}
                onChange={formik.handleChange}
                error={formik.touched.modePaiement && Boolean(formik.errors.modePaiement)}
                helperText={formik.touched.modePaiement && formik.errors.modePaiement}
              >
                <MenuItem value="especes">Espèces</MenuItem>
                <MenuItem value="Wave">Wave</MenuItem>
                <MenuItem value="Orange Money">Orange Money</MenuItem>
                <MenuItem value="carte">Carte bancaire</MenuItem>
                <MenuItem value="virement">Virement</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="netAPayer"
                name="netAPayer"
                label="Net à payer"
                value={formik.values.netAPayer}
                onChange={formik.handleChange}
                error={formik.touched.netAPayer && Boolean(formik.errors.netAPayer)}
                helperText={formik.touched.netAPayer && formik.errors.netAPayer}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="caution"
                name="caution"
                label="Caution"
                value={formik.values.caution}
                onChange={formik.handleChange}
                error={formik.touched.caution && Boolean(formik.errors.caution)}
                helperText={formik.touched.caution && formik.errors.caution}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                id="carburant"
                name="carburant"
                label="Carburant"
                value={formik.values.carburant}
                onChange={formik.handleChange}
                error={formik.touched.carburant && Boolean(formik.errors.carburant)}
                helperText={formik.touched.carburant && formik.errors.carburant}
              >
                <MenuItem value="essence">Essence</MenuItem>
                <MenuItem value="diesel">Diesel</MenuItem>
                <MenuItem value="electrique">Électrique</MenuItem>
              </TextField>
            </Grid>

            {/* Bouton de soumission */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Générer le contrat
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </LocalizationProvider>
  );
};

export default FacturationForm; 