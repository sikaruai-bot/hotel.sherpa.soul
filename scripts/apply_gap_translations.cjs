const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '../src/Locales');

// Comprehensive dictionary for all 15 languages
const GAP_DATA = {
  en: {
    roomsCard: {
      categoriesAvailable: "3 Room Categories Available",
      onlyLeft: "Only 2 rooms left!",
      perNight: "/ night",
      directOff: "10% Direct OFF"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "High-speed Fiber Wi-Fi",
      "1_king_bed___1_single_bed": "1 King Bed + 1 Single Bed",
      "1_king_size_bed": "1 King Size Bed",
      private_attached_bathroom__24_7_hot_water_: "Private Attached Bathroom (24/7 Hot Water)",
      private_ensuite_bathroom__24_7_hot_water_: "Private Ensuite Bathroom (24/7 Hot Water)",
      ceiling_fan___heating: "Ceiling Fan / Heating",
      shared_guest_kitchen_access: "Shared Guest Kitchen Access",
      complimentary_trekker_luggage_storage: "Complimentary Trekker Luggage Storage",
      daily_housekeeping: "Daily Housekeeping",
      "24_7_front_desk_assistance": "24/7 Front Desk Assistance",
      air_conditioning__ac_: "Air Conditioning (AC)",
      work_desk___seating: "Work Desk & Seating",
      comfortable_seating_area: "Comfortable Seating Area"
    },
    contact: {
      card: {
        quick: { title: "Quick Response", des: "Within 24 hours" },
        res: { title: "Quick Response", des: "Within 24 hours" },
        per: { title: "Personal Touch", des: "Dedicated Support" }
      },
      form: {
        desc: "Fill out the form below and we'll get back to you soon!",
        placeholders: {
          name: "Enter your full name",
          phone: "+977 98XXXXXXXX",
          message: "Tell us about your inquiry, booking dates, or request..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
    },
    aboutstats: {
      title1: "Your Home Away From",
      title2: "Home",
      para1: "Experience authentic Sherpa hospitality in our cozy guest house. We believe that comfortable accommodation shouldn't break the bank. Our family-run establishment offers warm, personalized service with all the essential amenities you need for a memorable stay.",
      para2: "Whether you're here for trekking, sightseeing, or resting on your journey, we provide a clean, safe, and welcoming environment where every guest is treated like family. Our commitment to honest hospitality means you get exceptional comfort and value in the center of Thamel.",
      amenities: {
        "1": "Comfortable Rooms",
        "2": "Wifi throughout the building",
        "3": "Prime Location",
        "4": "Pick up & Drop Request"
      },
      stat: {
        "1": "Front Desk Support",
        "2": "Quiet & Peaceful",
        "3": "Direct Booking Discount",
        "4": "Luggage Storage"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "No Restaurant. No Noise. Sleep Well.",
        description: "Hotel Sherpa Soul is a peaceful and comfortable hotel in Thamel, Kathmandu, created for travelers looking for a convenient location, comfortable rooms and a good night's sleep."
      },
      followUs: { title: "Follow Us" },
      quickLinks: {
        title: "Quick Links",
        links: {
          home: "Home",
          rooms: "Rooms & Suites",
          aboutUs: "About Us",
          services: "Services & Amenities",
          gallery: "Photo Gallery",
          blog: "Travel Blog",
          guestGuide: "Guest Guide",
          contact: "Contact & Location"
        }
      },
      contactUs: {
        title: "Contact Us",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
      },
      otas: {
        title: "Book on Top OTAs",
        bookingCom: "Book on Booking.com",
        airbnb: "Book on Airbnb",
        agoda: "Book on Agoda",
        tripCom: "Book on Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Kathmandu",
        heading: "Ready to Sleep Well?",
        copy: "Stay in the heart of Thamel and make Hotel Sherpa Soul your comfortable base for Kathmandu and your journey through Nepal.",
        button: "Book Your Stay"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "All rights reserved."
      },
      legal: {
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        guestGuide: "Guest Guide & House Rules",
        cookies: "Cookie Preferences",
        cms: "CMS Portal"
      }
    }
  },

  es: {
    roomsCard: {
      categoriesAvailable: "3 Categorías de Habitaciones Disponibles",
      onlyLeft: "¡Solo quedan 2 habitaciones!",
      perNight: "/ noche",
      directOff: "10% Descuento Directo"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Wi-Fi de Fibra de Alta Velocidad",
      "1_king_bed___1_single_bed": "1 Cama King + 1 Cama Individual",
      "1_king_size_bed": "1 Cama King Size",
      private_attached_bathroom__24_7_hot_water_: "Baño Privado Adjunto (Agua Caliente 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "Baño Privado en Habitación (Agua Caliente 24/7)",
      ceiling_fan___heating: "Ventilador de Techo / Calefacción",
      shared_guest_kitchen_access: "Acceso a Cocina Compartida",
      complimentary_trekker_luggage_storage: "Consigna de Equipaje Gratuita para Trekkers",
      daily_housekeeping: "Servicio Diario de Limpieza",
      "24_7_front_desk_assistance": "Atención de Recepción 24/7",
      air_conditioning__ac_: "Aire Acondicionado (AC)",
      work_desk___seating: "Escritorio de Trabajo y Asientos",
      comfortable_seating_area: "Área de Estar Confortable"
    },
    contact: {
      card: {
        quick: { title: "Respuesta Rápida", des: "En menos de 24 horas" },
        res: { title: "Respuesta Rápida", des: "En menos de 24 horas" },
        per: { title: "Trato Personalizado", des: "Atención Dedicada" }
      },
      form: {
        desc: "¡Complete el formulario a continuación y le responderemos muy pronto!",
        placeholders: {
          name: "Ingrese su nombre completo",
          phone: "+977 98XXXXXXXX",
          message: "Cuéntenos sobre su consulta, fechas de reserva o peticiones..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Katmandú 44600, Nepal"
    },
    aboutstats: {
      title1: "Su Hogar Lejos de",
      title2: "Casa",
      para1: "Experimente la auténtica hospitalidad sherpa en nuestra acogedora casa de huéspedes. Creemos que un alojamiento cómodo no debe ser costoso. Ofrecemos un servicio cálido y personalizado con todas las comodidades esenciales.",
      para2: "Ya sea que esté aquí para trekking, turismo o descanso en su viaje, le brindamos un ambiente limpio, seguro y acogedor donde cada huésped es tratado como familia.",
      amenities: {
        "1": "Habitaciones Cómodas",
        "2": "Wifi en todo el edificio",
        "3": "Ubicación Privilegiada",
        "4": "Traslado Bajo Petición"
      },
      stat: {
        "1": "Atención de Recepción 24/7",
        "2": "100% Tranquilo y Silencioso",
        "3": "10% Descuento Reserva Directa",
        "4": "Consigna de Equipaje Gratis"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Sin Restaurante. Sin Ruido. Duerma Bien.",
        description: "Hotel Sherpa Soul es un hotel tranquilo y cómodo en Thamel, Katmandú, creado para viajeros que buscan una ubicación práctica, habitaciones confortables y una noche de descanso reparador."
      },
      followUs: { title: "Síganos" },
      quickLinks: {
        title: "Enlaces Rápidos",
        links: {
          home: "Inicio",
          rooms: "Habitaciones y Suites",
          aboutUs: "Sobre Nosotros",
          services: "Servicios e Instalaciones",
          gallery: "Galería de Fotos",
          blog: "Blog de Viajes",
          guestGuide: "Guía del Huésped",
          contact: "Contacto y Ubicación"
        }
      },
      contactUs: {
        title: "Contáctenos",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Katmandú 44600, Nepal"
      },
      otas: {
        title: "Reserve en las Principales OTAs",
        bookingCom: "Reservar en Booking.com",
        airbnb: "Reservar en Airbnb",
        agoda: "Reservar en Agoda",
        tripCom: "Reservar en Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Katmandú",
        heading: "¿Listo para Dormir Bien?",
        copy: "Alójese en el corazón de Thamel y haga del Hotel Sherpa Soul su base cómoda para Katmandú y su viaje por Nepal.",
        button: "Reserve su Estancia"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Todos los derechos reservados."
      },
      legal: {
        privacy: "Política de Privacidad",
        terms: "Términos del Servicio",
        guestGuide: "Guía del Huésped y Normas",
        cookies: "Preferencias de Cookies",
        cms: "Portal CMS"
      }
    }
  },

  fra: {
    roomsCard: {
      categoriesAvailable: "3 Catégories de Chambres Disponibles",
      onlyLeft: "Plus que 2 chambres disponibles !",
      perNight: "/ nuit",
      directOff: "10% de Réduction Directe"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Wi-Fi Fibre Haut Débit",
      "1_king_bed___1_single_bed": "1 Grand Lit King + 1 Lit Simple",
      "1_king_size_bed": "1 Grand Lit King Size",
      private_attached_bathroom__24_7_hot_water_: "Salle de Bain Privée Attenante (Eau Chaude 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "Salle de Bain Privative (Eau Chaude 24/7)",
      ceiling_fan___heating: "Ventilateur de Plafond / Chauffage",
      shared_guest_kitchen_access: "Accès à la Cuisine Commune",
      complimentary_trekker_luggage_storage: "Stockage Gratuit des Bagages pour Trekkers",
      daily_housekeeping: "Entretien Ménager Quotidien",
      "24_7_front_desk_assistance": "Assistance Réception 24/7",
      air_conditioning__ac_: "Climatisation (AC)",
      work_desk___seating: "Bureau de Travail et Sièges",
      comfortable_seating_area: "Espace Salon Confortable"
    },
    contact: {
      card: {
        quick: { title: "Réponse Rapide", des: "Sous 24 heures" },
        res: { title: "Réponse Rapide", des: "Sous 24 heures" },
        per: { title: "Attention Personnalisée", des: "Assistance Dévouée" }
      },
      form: {
        desc: "Remplissez le formulaire ci-dessous et nous vous répondrons rapidement !",
        placeholders: {
          name: "Entrez votre nom complet",
          phone: "+977 98XXXXXXXX",
          message: "Parlez-nous de votre demande, dates de séjour ou besoins..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Katmandou 44600, Népal"
    },
    aboutstats: {
      title1: "Votre Deuxième",
      title2: "Maison",
      para1: "Découvrez l'hospitalité authentique des Sherpas dans notre maison d'hôtes chaleureuse. Nous pensons qu'un séjour tout confort ne doit pas être excessif. Notre hôtel familial offre un service personnalisé et bienveillant.",
      para2: "Que vous veniez pour le trekking, les visites culturelles ou un repos bien mérité, nous vous offrons un cadre propre, sûr et accueillant où chaque voyageur fait partie de notre famille.",
      amenities: {
        "1": "Chambres Confortables",
        "2": "Wi-Fi dans tout le bâtiment",
        "3": "Emplacement Idéal",
        "4": "Transfert sur Demande"
      },
      stat: {
        "1": "Réception Ouverte 24/7",
        "2": "100% Calme & Paisible",
        "3": "10% Réduction Réservation Directe",
        "4": "Bagagerie Gratuite"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Pas de Restaurant. Pas de Bruit. Dormez Bien.",
        description: "L'Hôtel Sherpa Soul est un établissement calme et confortable à Thamel, Katmandou, pensé pour les voyageurs en quête de repos et d'un séjour serein."
      },
      followUs: { title: "Suivez-Nous" },
      quickLinks: {
        title: "Liens Rapides",
        links: {
          home: "Accueil",
          rooms: "Chambres & Suites",
          aboutUs: "À Propos",
          services: "Services & Équipements",
          gallery: "Galerie Photos",
          blog: "Blog de Voyage",
          guestGuide: "Guide du Client",
          contact: "Contact & Emplacement"
        }
      },
      contactUs: {
        title: "Contactez-Nous",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Katmandou 44600, Népal"
      },
      otas: {
        title: "Réserver sur les Principales Plateformes",
        bookingCom: "Réserver sur Booking.com",
        airbnb: "Réserver sur Airbnb",
        agoda: "Réserver sur Agoda",
        tripCom: "Réserver sur Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Katmandou",
        heading: "Prêt à Bien Dormir ?",
        copy: "Séjournez au cœur de Thamel et faites de l'Hôtel Sherpa Soul votre havre de paix confortable à Katmandou et au Népal.",
        button: "Réserver Votre Séjour"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Tous droits réservés."
      },
      legal: {
        privacy: "Politique de Confidentialité",
        terms: "Conditions de Service",
        guestGuide: "Guide du Client & Règlement",
        cookies: "Préférences de Cookies",
        cms: "Portail CMS"
      }
    }
  },

  de: {
    roomsCard: {
      categoriesAvailable: "3 Zimmerkategorien Verfügbar",
      onlyLeft: "Nur noch 2 Zimmer frei!",
      perNight: "/ Nacht",
      directOff: "10% Direktrabatt"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Highspeed-Glasfaser-WLAN",
      "1_king_bed___1_single_bed": "1 Kingsize-Bett + 1 Einzelbett",
      "1_king_size_bed": "1 Kingsize-Doppelbett",
      private_attached_bathroom__24_7_hot_water_: "Eigenes Angrenzendes Bad (24/7 Warmwasser)",
      private_ensuite_bathroom__24_7_hot_water_: "Privates Ensuite-Badezimmer (24/7 Warmwasser)",
      ceiling_fan___heating: "Deckenventilator / Heizung",
      shared_guest_kitchen_access: "Zugang zur Gemeinschaftsküche",
      complimentary_trekker_luggage_storage: "Kostenlose Trekking-Gepäckaufbewahrung",
      daily_housekeeping: "Tägliche Zimmerreinigung",
      "24_7_front_desk_assistance": "24/7 Rezeptionsservice",
      air_conditioning__ac_: "Klimaanlage (AC)",
      work_desk___seating: "Schreibtisch und Sitzgelegenheiten",
      comfortable_seating_area: "Gemütlicher Sitzbereich"
    },
    contact: {
      card: {
        quick: { title: "Schnelle Antwort", des: "Innerhalb von 24 Stunden" },
        res: { title: "Schnelle Antwort", des: "Innerhalb von 24 Stunden" },
        per: { title: "Persönliche Betreuung", des: "Engagierter Support" }
      },
      form: {
        desc: "Füllen Sie das untenstehende Formular aus und wir melden uns schnellstmöglich bei Ihnen!",
        placeholders: {
          name: "Vollständigen Namen eingeben",
          phone: "+977 98XXXXXXXX",
          message: "Teilen Sie uns Ihre Anfrage, Reisedaten oder Wünsche mit..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
    },
    aboutstats: {
      title1: "Ihr Zuhause Fern von",
      title2: "Zuhause",
      para1: "Erleben Sie echte Sherpa-Gastfreundschaft in unserem gemütlichen Gästehaus. Wir bieten herzlichen, persönlichen Service und alle wichtigen Annehmlichkeiten für einen unvergesslichen Aufenthalt.",
      para2: "Ob für Trekking, Sightseeing oder Erholung auf Ihrer Reise: Bei uns finden Sie eine saubere, sichere und herzliche Umgebung.",
      amenities: {
        "1": "Komfortable Zimmer",
        "2": "WLAN im gesamten Gebäude",
        "3": "Erstklassige Lage",
        "4": "Flughafentransfer auf Anfrage"
      },
      stat: {
        "1": "24/7 Rezeptionsservice",
        "2": "100% Ruhig & Friedlich",
        "3": "10% Direktbuchungsrabatt",
        "4": "Kostenlose Gepäckaufbewahrung"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Kein Restaurant. Kein Lärm. Gut Schlafen.",
        description: "Das Hotel Sherpa Soul ist ein ruhiges und gemütliches Hotel in Thamel, Kathmandu, geschaffen für Reisende, die eine praktische Lage und besten Schlaf suchen."
      },
      followUs: { title: "Folgen Sie Uns" },
      quickLinks: {
        title: "Schnelllinks",
        links: {
          home: "Startseite",
          rooms: "Zimmer & Suiten",
          aboutUs: "Über Uns",
          services: "Services & Ausstattung",
          gallery: "Fotogalerie",
          blog: "Reiseblog",
          guestGuide: "Gäste-Leitfaden",
          contact: "Kontakt & Lage"
        }
      },
      contactUs: {
        title: "Kontakt",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
      },
      otas: {
        title: "Auf Top-Portalen Buchen",
        bookingCom: "Auf Booking.com buchen",
        airbnb: "Auf Airbnb buchen",
        agoda: "Auf Agoda buchen",
        tripCom: "Auf Trip.com buchen"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Kathmandu",
        heading: "Bereit für Erholsamen Schlaf?",
        copy: "Übernachten Sie im Herzen von Thamel und machen Sie das Hotel Sherpa Soul zu Ihrem ruhigen Stützpunkt in Kathmandu.",
        button: "Aufenthalt Buchen"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Alle Rechte vorbehalten."
      },
      legal: {
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
        guestGuide: "Gäste-Leitfaden & Hausordnung",
        cookies: "Cookie-Einstellungen",
        cms: "CMS-Portal"
      }
    }
  },

  it: {
    roomsCard: {
      categoriesAvailable: "3 Categorie di Camere Disponibili",
      onlyLeft: "Solo 2 camere rimaste!",
      perNight: "/ notte",
      directOff: "10% Sconto Diretto"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Wi-Fi Fibra ad Alta Velocità",
      "1_king_bed___1_single_bed": "1 Letto King + 1 Letto Singolo",
      "1_king_size_bed": "1 Letto King Size",
      private_attached_bathroom__24_7_hot_water_: "Bagno Privato in Camera (Acqua Calda 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "Bagno Privato Ensuite (Acqua Calda 24/7)",
      ceiling_fan___heating: "Ventilatore a Soffitto / Riscaldamento",
      shared_guest_kitchen_access: "Accesso alla Cucina Condivisa",
      complimentary_trekker_luggage_storage: "Deposito Bagagli Gratuito per Trekker",
      daily_housekeeping: "Pulizie Giornaliere",
      "24_7_front_desk_assistance": "Assistenza Reception 24/7",
      air_conditioning__ac_: "Aria Condizionata (AC)",
      work_desk___seating: "Scrivania da Lavoro e Sedute",
      comfortable_seating_area: "Zona Salotto Confortevole"
    },
    contact: {
      card: {
        quick: { title: "Risposta Rapida", des: "Entro 24 ore" },
        res: { title: "Risposta Rapida", des: "Entro 24 ore" },
        per: { title: "Tocco Personale", des: "Supporto Dedicato" }
      },
      form: {
        desc: "Compila il modulo sottostante e ti risponderemo al più presto!",
        placeholders: {
          name: "Inserisci il tuo nome completo",
          phone: "+977 98XXXXXXXX",
          message: "Descrivi la tua richiesta, date di soggiorno o preferenze..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
    },
    aboutstats: {
      title1: "La Tua Casa Lontano da",
      title2: "Casa",
      para1: "Vivi l'autentica ospitalità Sherpa nella nostra accogliente struttura. Crediamo che un alloggio comodo debba essere accessibile e curato nei minimi dettagli.",
      para2: "Che tu sia qui per il trekking, visite turistiche o meritato riposo, offriamo un ambiente pulito, sicuro e accogliente dove sentirti in famiglia.",
      amenities: {
        "1": "Camere Confortevoli",
        "2": "Wi-Fi in tutto l'edificio",
        "3": "Posizione Strategica",
        "4": "Transfer su Richiesta"
      },
      stat: {
        "1": "Assistenza Reception 24/7",
        "2": "100% Tranquillo & Silenzioso",
        "3": "10% Sconto Prenotazione Diretta",
        "4": "Deposito Bagagli Gratuito"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Nessun Ristorante. Nessun Rumore. Dormi Bene.",
        description: "L'Hotel Sherpa Soul è un hotel tranquillo e confortevole a Thamel, Kathmandu, creato per i viaggiatori che cercano una posizione ideale e un sonno ristoratore."
      },
      followUs: { title: "Seguici" },
      quickLinks: {
        title: "Collegamenti Rapidi",
        links: {
          home: "Home",
          rooms: "Camere & Suite",
          aboutUs: "Chi Siamo",
          services: "Servizi & Comfort",
          gallery: "Galleria Foto",
          blog: "Blog di Viaggio",
          guestGuide: "Guida per gli Ospiti",
          contact: "Contatti & Posizione"
        }
      },
      contactUs: {
        title: "Contattaci",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
      },
      otas: {
        title: "Prenota sulle Migliori OTA",
        bookingCom: "Prenota su Booking.com",
        airbnb: "Prenota su Airbnb",
        agoda: "Prenota su Agoda",
        tripCom: "Prenota su Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Kathmandu",
        heading: "Pronti a Dormire Bene?",
        copy: "Soggiorna nel cuore di Thamel e fai dell'Hotel Sherpa Soul la tua base tranquilla e comoda a Kathmandu.",
        button: "Prenota il Tuo Soggiorno"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Tutti i diritti riservati."
      },
      legal: {
        privacy: "Informativa sulla Privacy",
        terms: "Termini di Servizio",
        guestGuide: "Guida Ospiti & Regolamento",
        cookies: "Preferenze Cookie",
        cms: "Portale CMS"
      }
    }
  },

  pt: {
    roomsCard: {
      categoriesAvailable: "3 Categorias de Quartos Disponíveis",
      onlyLeft: "Apenas 2 quartos disponíveis!",
      perNight: "/ noite",
      directOff: "10% Desconto Direto"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Wi-Fi Fibra de Alta Velocidade",
      "1_king_bed___1_single_bed": "1 Cama King + 1 Cama Individual",
      "1_king_size_bed": "1 Cama King Size",
      private_attached_bathroom__24_7_hot_water_: "Casa de Banho Privativa (Água Quente 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "Casa de Banho Privada em Suite (Água Quente 24/7)",
      ceiling_fan___heating: "Ventilador de Teto / Aquecimento",
      shared_guest_kitchen_access: "Acesso a Cozinha Partilhada",
      complimentary_trekker_luggage_storage: "Armazenamento Gratuito de Bagagem para Trekkers",
      daily_housekeeping: "Limpeza Diária do Quarto",
      "24_7_front_desk_assistance": "Receção e Apoio 24 Horas",
      air_conditioning__ac_: "Ar Condicionado (AC)",
      work_desk___seating: "Secretária de Trabalho e Cadeiras",
      comfortable_seating_area: "Área de Estar Confortável"
    },
    contact: {
      card: {
        quick: { title: "Resposta Rápida", des: "Em menos de 24 horas" },
        res: { title: "Resposta Rápida", des: "Em menos de 24 horas" },
        per: { title: "Atenção Pessoal", des: "Suporte Dedicado" }
      },
      form: {
        desc: "Preencha o formulário abaixo e entraremos em contacto em breve!",
        placeholders: {
          name: "Introduza o seu nome completo",
          phone: "+977 98XXXXXXXX",
          message: "Partilhe a sua dúvida, datas de reserva ou pedidos especiais..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Katmandu 44600, Nepal"
    },
    aboutstats: {
      title1: "A Sua Casa Longe de",
      title2: "Casa",
      para1: "Experimente a hospitalidade autêntica dos Sherpas na nossa acolhedora casa de hóspedes. Acreditamos que o conforto não precisa de ser caro.",
      para2: "Quer venha para trekking, passeios turísticos ou para descansar na sua jornada, oferecemos um ambiente limpo, seguro e acolhedor onde é tratado como família.",
      amenities: {
        "1": "Quartos Confortáveis",
        "2": "Wi-Fi em todo o edifício",
        "3": "Localização Privilegiada",
        "4": "Transporte Sob Consulta"
      },
      stat: {
        "1": "Receção 24/7",
        "2": "100% Calmo & Silencioso",
        "3": "10% Desconto Reserva Direta",
        "4": "Armazenamento Gratuito de Bagagem"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Sem Restaurante. Sem Ruído. Durma Bem.",
        description: "O Hotel Sherpa Soul é um hotel tranquilo e confortável em Thamel, Katmandu, criado para viajantes que procuram uma excelente localização, quartos confortáveis e uma ótima noite de sono."
      },
      followUs: { title: "Siga-Nos" },
      quickLinks: {
        title: "Ligações Rápidas",
        links: {
          home: "Início",
          rooms: "Quartos & Suítes",
          aboutUs: "Sobre Nós",
          services: "Serviços & Comodidades",
          gallery: "Galeria de Fotos",
          blog: "Blog de Viagens",
          guestGuide: "Guia do Hóspede",
          contact: "Contacto & Localização"
        }
      },
      contactUs: {
        title: "Contacte-Nos",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Katmandu 44600, Nepal"
      },
      otas: {
        title: "Reserve nas Principais Plataformas",
        bookingCom: "Reservar no Booking.com",
        airbnb: "Reservar no Airbnb",
        agoda: "Reservar no Agoda",
        tripCom: "Reservar no Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Katmandu",
        heading: "Pronto para Dormir Bem?",
        copy: "Fique no coração de Thamel e faça do Hotel Sherpa Soul a sua base confortável para Katmandu e para a sua viagem pelo Nepal.",
        button: "Reserve a Sua Estadia"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Todos os direitos reservados."
      },
      legal: {
        privacy: "Política de Privacidade",
        terms: "Termos de Serviço",
        guestGuide: "Guia do Hóspede & Regras",
        cookies: "Preferências de Cookies",
        cms: "Portal CMS"
      }
    }
  },

  nl: {
    roomsCard: {
      categoriesAvailable: "3 Kamercategorieën Beschikbaar",
      onlyLeft: "Nog maar 2 kamers beschikbaar!",
      perNight: "/ nacht",
      directOff: "10% Directe Korting"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Supersnel Glasvezel Wi-Fi",
      "1_king_bed___1_single_bed": "1 Kingsize Bed + 1 Eenpersoonsbed",
      "1_king_size_bed": "1 Kingsize Tweepersoonsbed",
      private_attached_bathroom__24_7_hot_water_: "Eigen Aangrenzende Badkamer (24/7 Warm Water)",
      private_ensuite_bathroom__24_7_hot_water_: "Privé Ensuite Badkamer (24/7 Warm Water)",
      ceiling_fan___heating: "Plafondventilator / Verwarming",
      shared_guest_kitchen_access: "Toegang tot Gedeelde Gastenkeuken",
      complimentary_trekker_luggage_storage: "Gratis Bagageopslag voor Trekkers",
      daily_housekeeping: "Dagelijkse Schoonmaakservice",
      "24_7_front_desk_assistance": "24/7 Receptie Ondersteuning",
      air_conditioning__ac_: "Airconditioning (AC)",
      work_desk___seating: "Werkbureau en Comfortabele Stoelen",
      comfortable_seating_area: "Gezellige Zithoek"
    },
    contact: {
      card: {
        quick: { title: "Snelle Reactie", des: "Binnen 24 uur" },
        res: { title: "Snelle Reactie", des: "Binnen 24 uur" },
        per: { title: "Persoonlijke Aandacht", des: "Toegewijde Ondersteuning" }
      },
      form: {
        desc: "Vul het onderstaande formulier in en we nemen zo spoedig mogelijk contact met u op!",
        placeholders: {
          name: "Vul uw volledige naam in",
          phone: "+977 98XXXXXXXX",
          message: "Vertel ons over uw vraag, reisdata of wensen..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
    },
    aboutstats: {
      title1: "Uw Thuis Ver van",
      title2: "Huis",
      para1: "Ervaar authentieke Sherpa-gastvrijheid in ons gezellige guesthouse. Wij geloven dat comfortabele accommodatie betaalbaar moet blijven. Ons familiebedrijf biedt persoonlijke en warme service.",
      para2: "Of u nu komt voor bergtochten, bezienswaardigheden of rust tijdens uw rondreis: wij bieden een schone, veilige en gastvrije omgeving waar u zich direct thuis voelt.",
      amenities: {
        "1": "Comfortabele Kamers",
        "2": "Wifi in het hele gebouw",
        "3": "Toplocatie in Thamel",
        "4": "Luchthaventransfer op Aanvraag"
      },
      stat: {
        "1": "24/7 Receptie Ondersteuning",
        "2": "100% Rustig & Vredig",
        "3": "10% Directe Boekingskorting",
        "4": "Gratis Bagageopslag"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Geen Restaurant. Geen Lawaai. Slaap Goed.",
        description: "Hotel Sherpa Soul is een rustig en comfortabel hotel in Thamel, Kathmandu, ontworpen voor reizigers die een centrale locatie en een rustgevende nachtrust wensen."
      },
      followUs: { title: "Volg Ons" },
      quickLinks: {
        title: "Snelle Links",
        links: {
          home: "Home",
          rooms: "Kamers & Suites",
          aboutUs: "Over Ons",
          services: "Diensten & Voorzieningen",
          gallery: "Fotogalerij",
          blog: "Reisblog",
          guestGuide: "Gastengids",
          contact: "Contact & Locatie"
        }
      },
      contactUs: {
        title: "Neem Contact Op",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Kathmandu 44600, Nepal"
      },
      otas: {
        title: "Boek op de Beste Boekingssites",
        bookingCom: "Boeken op Booking.com",
        airbnb: "Boeken op Airbnb",
        agoda: "Boeken op Agoda",
        tripCom: "Boeken op Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Thamel, Kathmandu",
        heading: "Klaar om Heerlijk te Slapen?",
        copy: "Verblijf in het hart van Thamel en maak Hotel Sherpa Soul uw comfortabele thuisbasis in Kathmandu en tijdens uw reis door Nepal.",
        button: "Boek Uw Verblijf"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Alle rechten voorbehouden."
      },
      legal: {
        privacy: "Privacybeleid",
        terms: "Algemene Voorwaarden",
        guestGuide: "Gastengids & Huisregels",
        cookies: "Cookievoorkeuren",
        cms: "CMS Portaal"
      }
    }
  },

  rs: {
    roomsCard: {
      categoriesAvailable: "Доступно 3 категории номеров",
      onlyLeft: "Осталось всего 2 номера!",
      perNight: "/ ночь",
      directOff: "10% Прямая скидка"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "Высокоскоростной Оптоволоконный Wi-Fi",
      "1_king_bed___1_single_bed": "1 Большая Кровать King + 1 Односпальная",
      "1_king_size_bed": "1 Большая Кровать King Size",
      private_attached_bathroom__24_7_hot_water_: "Собственная Ванная Комната (Горячая Вода 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "Приватная Ванная Комната (Горячая Вода 24/7)",
      ceiling_fan___heating: "Потолочный Вентилятор / Отопление",
      shared_guest_kitchen_access: "Доступ к Общей Кухне для Гостей",
      complimentary_trekker_luggage_storage: "Бесплатное Хранение Багажа для Треккеров",
      daily_housekeeping: "Ежедневная Уборка Номеров",
      "24_7_front_desk_assistance": "Круглосуточная Стойка Регистрации 24/7",
      air_conditioning__ac_: "Кондиционер (AC)",
      work_desk___seating: "Рабочий Стол и Стулья",
      comfortable_seating_area: "Уютная Зона Отдыха"
    },
    contact: {
      card: {
        quick: { title: "Быстрый Ответ", des: "В течение 24 часов" },
        res: { title: "Быстрый Ответ", des: "В течение 24 часов" },
        per: { title: "Личный Подход", des: "Заботливая Поддержка" }
      },
      form: {
        desc: "Заполните форму ниже, и мы свяжемся с вами в ближайшее время!",
        placeholders: {
          name: "Введите ваше полное имя",
          phone: "+977 98XXXXXXXX",
          message: "Напишите ваш вопрос, даты бронирования или пожелания..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 Thamel Bhagawati Marg, Катманду 44600, Непал"
    },
    aboutstats: {
      title1: "Ваш Дом Вдали от",
      title2: "Дома",
      para1: "Почувствуйте подлинное гостеприимство шерпов в нашем уютном отеле. Мы уверены, что комфортное проживание должно быть доступным. Наш семейный отель окружит вас теплом и заботой.",
      para2: "Приехали ли вы для треккинга, осмотра достопримечательностей или отдыха: мы гарантируем идеальную чистоту, безопасность и дружелюбие.",
      amenities: {
        "1": "Комфортные Номера",
        "2": "Wi-Fi на всей территории",
        "3": "Отличное Расположение",
        "4": "Трансфер по Запросу"
      },
      stat: {
        "1": "Круглосуточная Стойка 24/7",
        "2": "100% Тишина и Покой",
        "3": "Скидка 10% за Прямое Бронирование",
        "4": "Бесплатная Камера Хранения"
      }
    },
    footer: {
      brand: {
        title: "Hotel Sherpa Soul",
        tagline: "Без Ресторана. Без Шума. Крепкий Сон.",
        description: "Hotel Sherpa Soul — тихий и уютный отель в Тамеле, Катманду, созданный для путешественников, ценящих удобное расположение и глубокий спокойный сон."
      },
      followUs: { title: "Мы в Соцсетях" },
      quickLinks: {
        title: "Быстрые Ссылки",
        links: {
          home: "Главная",
          rooms: "Номера и Люксы",
          aboutUs: "О Нас",
          services: "Услуги и Удобства",
          gallery: "Фотогалерея",
          blog: "Блог о Путешествиях",
          guestGuide: "Памятка Гостя",
          contact: "Контакты и Локация"
        }
      },
      contactUs: {
        title: "Связаться с Нами",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 Thamel Bhagawati Marg, Катманду 44600, Непал"
      },
      otas: {
        title: "Бронируйте на Ведущих Платформах",
        bookingCom: "Забронировать на Booking.com",
        airbnb: "Забронировать на Airbnb",
        agoda: "Забронировать на Agoda",
        tripCom: "Забронировать на Trip.com"
      },
      cta: {
        badge: "Hotel Sherpa Soul • Тамель, Катманду",
        heading: "Готовы к Спокойному Сну?",
        copy: "Остановитесь в самом сердце Тамеля: отель Sherpa Soul станет вашей уютной и тихой базой в Катманду.",
        button: "Забронировать Номер"
      },
      copyright: {
        prefix: "©",
        hotelName: "Hotel Sherpa Soul",
        suffix: "Все права защищены."
      },
      legal: {
        privacy: "Политика Конфиденциальности",
        terms: "Условия Обслуживания",
        guestGuide: "Памятка Гостя и Правила",
        cookies: "Настройки Cookies",
        cms: "CMS Портал"
      }
    }
  },

  ko: {
    roomsCard: {
      categoriesAvailable: "3가지 객실 유형 이용 가능",
      onlyLeft: "잔여 객실 단 2개!",
      perNight: "/ 박",
      directOff: "10% 직접 할인"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "초고속 광케이블 Wi-Fi",
      "1_king_bed___1_single_bed": "킹 침대 1개 + 싱글 침대 1개",
      "1_king_size_bed": "넓은 킹사이즈 침대 1개",
      private_attached_bathroom__24_7_hot_water_: "객실 내 전용 욕실 (24시간 온수 샤워)",
      private_ensuite_bathroom__24_7_hot_water_: "객실 내 개별 욕실 (24시간 온수 샤워)",
      ceiling_fan___heating: "실링팬 / 개별 난방",
      shared_guest_kitchen_access: "투숙객 전용 공용 주방 이용",
      complimentary_trekker_luggage_storage: "트레커를 위한 무료 짐 보관",
      daily_housekeeping: "매일 깨끗한 객실 정비",
      "24_7_front_desk_assistance": "24시간 프런트 데스크 안내",
      air_conditioning__ac_: "개별 냉난방 에어컨 (AC)",
      work_desk___seating: "업무용 데스크 및 편안한 의자",
      comfortable_seating_area: "아늑한 휴식 공간"
    },
    contact: {
      card: {
        quick: { title: "신속한 답변", des: "24시간 이내 응대" },
        res: { title: "신속한 답변", des: "24시간 이내 응대" },
        per: { title: "세심한 맞춤 지원", des: "전담 직원의 정성 어린 안내" }
      },
      form: {
        desc: "아래 양식을 작성해 주시면 신속하게 답변해 드리겠습니다!",
        placeholders: {
          name: "성함을 입력하세요",
          phone: "+977 98XXXXXXXX",
          message: "문의사항, 투숙 일정, 특별 요청사항을 적어주세요..."
        }
      }
    },
    getInTouch: {
      visitDetail: "네팔 카트만두 44600, 타멜 바가와티 마르그 26번지"
    },
    aboutstats: {
      title1: "집처럼 편안한",
      title2: "카트만두의 안식처",
      para1: "아늑한 게스트하우스에서 진정한 셰르파의 따뜻한 환대를 경험해 보세요. 편안한 숙박이 비쌀 필요는 없습니다. 가족이 운영하는 정성 어린 서비스로 잊지 못할 추억을 선사합니다.",
      para2: "히말라야 트레킹, 문화 유적지 관광, 긴 여정 중의 꿀맛 같은 휴식 등 어떤 목적으로 방문하시든 내 집처럼 깨끗하고 안전하며 따뜻한 휴식처를 약속드립니다.",
      amenities: {
        "1": "편안하고 아늑한 객실",
        "2": "전 구역 고속 와이파이",
        "3": "타멜 중심 최고의 입지",
        "4": "공항 픽업/샌딩 요청 가능"
      },
      stat: {
        "1": "24시간 프런트 데스크 지원",
        "2": "100% 조용하고 평화로운 휴식",
        "3": "직접 예약 시 10% 즉시 할인",
        "4": "무료 트레커 짐 보관 서비스"
      }
    },
    footer: {
      brand: {
        title: "호텔 셰르파 소울",
        tagline: "식당 없음. 소음 없음. 편안한 숙면.",
        description: "호텔 셰르파 소울은 편리한 위치와 쾌적한 객실, 편안한 숙면을 원하는 여행자를 위해 조성된 카트만두 타멜의 고요한 부티크 호텔입니다."
      },
      followUs: { title: "소셜 미디어" },
      quickLinks: {
        title: "바로가기",
        links: {
          home: "홈",
          rooms: "객실 및 스위트",
          aboutUs: "호텔 소개",
          services: "서비스 및 편의시설",
          gallery: "사진 갤러리",
          blog: "여행 블로그",
          guestGuide: "투숙객 안내",
          contact: "연락처 및 위치"
        }
      },
      contactUs: {
        title: "고객 문의",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "네팔 카트만두 44600, 타멜 바가와티 마르그 26번지"
      },
      otas: {
        title: "주요 OTA 플랫폼에서 예약",
        bookingCom: "Booking.com에서 예약",
        airbnb: "Airbnb에서 예약",
        agoda: "Agoda에서 예약",
        tripCom: "Trip.com에서 예약"
      },
      cta: {
        badge: "호텔 셰르파 소울 • 카트만두 타멜",
        heading: "편안한 숙면을 취할 준비가 되셨나요?",
        copy: "타멜 중심부에 머물며 호텔 셰르파 소울을 카트만두 여행과 네팔 여정의 편안한 베이스캠프로 만드세요.",
        button: "객실 예약하기"
      },
      copyright: {
        prefix: "©",
        hotelName: "호텔 셰르파 소울",
        suffix: "All rights reserved."
      },
      legal: {
        privacy: "개인정보 처리방침",
        terms: "이용 약관",
        guestGuide: "투숙객 안내 및 이용 수칙",
        cookies: "쿠키 설정",
        cms: "CMS 포털"
      }
    }
  },

  ar: {
    roomsCard: {
      categoriesAvailable: "3 فئات غرف متاحة",
      onlyLeft: "تبقى غرفتان فقط!",
      perNight: "/ ليلة",
      directOff: "10% خصم مباشر"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "إنترنت ألياف ضوئية فائق السرعة",
      "1_king_bed___1_single_bed": "سرير كينغ كبير + سرير فردي",
      "1_king_size_bed": "سرير كينغ كبير ومريح",
      private_attached_bathroom__24_7_hot_water_: "حمام خاص متصل (مياه ساخنة 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "حمام داخلي خاص (مياه ساخنة 24/7)",
      ceiling_fan___heating: "مروحة سقف / تدفئة",
      shared_guest_kitchen_access: "إمكانية استخدام مطبخ النزلاء المشترك",
      complimentary_trekker_luggage_storage: "تخزين مجاني لأمتعة هواة تسلق الجبال",
      daily_housekeeping: "خدمة تنظيف الغرف اليومية",
      "24_7_front_desk_assistance": "مكتب استقبال متاح على مدار الساعة",
      air_conditioning__ac_: "تكييف هواء بتحكم فردي (AC)",
      work_desk___seating: "مكتب عمل ومقاعد مريحة",
      comfortable_seating_area: "منطقة جلوس مريحة"
    },
    contact: {
      card: {
        quick: { title: "استجابة سريعة", des: "خلال 24 ساعة" },
        res: { title: "استجابة سريعة", des: "خلال 24 ساعة" },
        per: { title: "اهتمام شخصي", des: "دعم مخصص ومتفانٍ" }
      },
      form: {
        desc: "املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت!",
        placeholders: {
          name: "أدخل اسمك الكامل",
          phone: "+977 98XXXXXXXX",
          message: "أخبرنا عن استفسارك، تواريخ الإقامة، أو أي طلبات خاصة..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 ثاميل باجاواتي مارغ، كاتماندو 44600، نيبال"
    },
    aboutstats: {
      title1: "بيتك المريح بعيداً عن",
      title2: "الوطن",
      para1: "عش تجربة الضيافة الشيربية الأصيلة في دار ضيافتنا الدافئة والمريحة. نحن نؤمن بأن الإقامة المريحة لا ينبغي أن تكون باهظة الثمن.",
      para2: "سواء كنت هنا لرحلات جبال الهيمالايا، أو مشاهدة المعالم السياحية، أو الاسترخاء في رحلتك، فإننا نوفر بيئة نظيفة وآمنة ودافئة حيث يُعامل كل ضيف كفرد من عائلتنا.",
      amenities: {
        "1": "غرف مريحة ونظيفة",
        "2": "واي فاي سريع في كل المبنى",
        "3": "موقع مميز في قلب ثاميل",
        "4": "خدمة التوصيل من المطار عند الطلب"
      },
      stat: {
        "1": "مكتب استقبال متاح 24/7",
        "2": "100% هدوء وسكينة تامة",
        "3": "خصم 10% للحجز المباشر",
        "4": "تخزين مجاني للأمتعة"
      }
    },
    footer: {
      brand: {
        title: "فندق شيربا سول",
        tagline: "لا مطعم. لا إزعاج. نوم هادئ ومريح.",
        description: "فندق شيربا سول هو فندق هادئ ومريح في ثاميل، كاتماندو، مصمم للمسافرين الباحثين عن موقع متميز وغرف نظيفة ونوم عميق ومريح."
      },
      followUs: { title: "تابعنا على" },
      quickLinks: {
        title: "روابط سريعة",
        links: {
          home: "الرئيسية",
          rooms: "الغرف والأجنحة",
          aboutUs: "من نحن",
          services: "الخدمات والمرافق",
          gallery: "معرض الصور",
          blog: "مدونة السفر",
          guestGuide: "دليل النزلاء",
          contact: "الاتصال والموقع"
        }
      },
      contactUs: {
        title: "تواصل معنا",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 ثاميل باجاواتي مارغ، كاتماندو 44600، نيبال"
      },
      otas: {
        title: "احجز عبر أفضل المنصات العالمية",
        bookingCom: "احجز عبر Booking.com",
        airbnb: "احجز عبر Airbnb",
        agoda: "احجز عبر Agoda",
        tripCom: "احجز عبر Trip.com"
      },
      cta: {
        badge: "فندق شيربا سول • ثاميل، كاتماندو",
        heading: "هل أنت مستعد لنوم هانئ وعميق؟",
        copy: "أقم في قلب ثاميل واجعل من فندق شيربا سول قاعدتك المريحة والهادئة في كاتماندو ورحلتك عبر نيبال.",
        button: "احجز إقامتك الآن"
      },
      copyright: {
        prefix: "©",
        hotelName: "فندق شيربا سول",
        suffix: "جميع الحقوق محفوظة."
      },
      legal: {
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        guestGuide: "دليل النزلاء والقواعد",
        cookies: "تفضيلات ملفات تعريف الارتباط",
        cms: "بوابة CMS"
      }
    }
  },

  he: {
    roomsCard: {
      categoriesAvailable: "3 קטגוריות חדרים זמינות",
      onlyLeft: "נותרו 2 חדרים בלבד!",
      perNight: "/ לילה",
      directOff: "10% הנחה ישירה"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "אינטרנט סיבים אופטיים מהיר",
      "1_king_bed___1_single_bed": "מיטת קינג גדולה + מיטת יחיד",
      "1_king_size_bed": "מיטת קינג סייז מרווחת",
      private_attached_bathroom__24_7_hot_water_: "חדר רחצה פרטי צמוד (מים חמים 24/7)",
      private_ensuite_bathroom__24_7_hot_water_: "חדר רחצה צמוד בחדר (מים חמים 24/7)",
      ceiling_fan___heating: "מאוורר תקרה / חימום",
      shared_guest_kitchen_access: "גישה למטבח משותף לאורחים",
      complimentary_trekker_luggage_storage: "אחסון תרמילים וציוד טרקים חינם",
      daily_housekeeping: "ניקיון חדרים יומי",
      "24_7_front_desk_assistance": "סיוע קבלה 24/7",
      air_conditioning__ac_: "מיזוג אוויר מפוצל (AC)",
      work_desk___seating: "שולחן עבודה וכיסאות נוחים",
      comfortable_seating_area: "פינת ישיבה נעימה"
    },
    contact: {
      card: {
        quick: { title: "מענה מהיר", des: "תוך פחות מ-24 שעות" },
        res: { title: "מענה מהיר", des: "תוך פחות מ-24 שעות" },
        per: { title: "יחס אישי וחם", des: "סיוע מסור בכל עת" }
      },
      form: {
        desc: "מלאו את הטופס למטה ונחזור אליכם בהקדם האפשרי!",
        placeholders: {
          name: "הזינו את שמכם המלא",
          phone: "+977 98XXXXXXXX",
          message: "ספרו לנו על פנייתכם, תאריכי האירוח או כל בקשה מיוחדת..."
        }
      }
    },
    getInTouch: {
      visitDetail: "תאמל בהגוואטי מארג 26, קטמנדו 44600, נפאל"
    },
    aboutstats: {
      title1: "הבית שלכם הרחק מן",
      title2: "הבית",
      para1: "בואו לחוות אירוח שרפה אותנטי וחם בבית ההארחה הנעים שלנו. אנו מאמינים שאירוח נוח ואיכותי אינו חייב להיות יקר. המלון המשפחתי שלנו מציע יחס אישי ולבבי.",
      para2: "בין אם הגעתם לטרקים בהימלאיה, סיורים בעיר או מנוחה ראויה, אנו מספקים סביבה נקייה, בטוחה ומזמינה בה כל אורח מרגיש חלק מהמשפחה.",
      amenities: {
        "1": "חדרים נוחים ונקיים",
        "2": "אינטרנט אלחוטי בכל המבנה",
        "3": "מיקום מרכזי מעולה",
        "4": "שירות הסעות משדה התעופה לפי בקשה"
      },
      stat: {
        "1": "שירות קבלה 24/7",
        "2": "100% שקט ושלווה",
        "3": "10% הנחה בהזמנה ישירה",
        "4": "שמירת חפצים ותרמילים חינם"
      }
    },
    footer: {
      brand: {
        title: "מלון שרפה סול",
        tagline: "בלי מסעדה. בלי רעש. שינה מעולה.",
        description: "מלון שרפה סול הוא מלון שקט ונעים בתאמל, קטמנדו, המיועד למטיילים המחפשים מיקום מעולה, חדרים נקיים ומנוחה אמיתית."
      },
      followUs: { title: "עקבו אחרינו" },
      quickLinks: {
        title: "קישורים מהירים",
        links: {
          home: "דף הבית",
          rooms: "חדרים וסוויטות",
          aboutUs: "אודותינו",
          services: "שירותים ומתקנים",
          gallery: "גלריית תמונות",
          blog: "בלוג טיולים",
          guestGuide: "מדריך לאורח",
          contact: "יצירת קשר ומיקום"
        }
      },
      contactUs: {
        title: "צרו קשר",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "תאמל בהגוואטי מארג 26, קטמנדו 44600, נפאל"
      },
      otas: {
        title: "הזמינו בפלטפורמות המובילות",
        bookingCom: "הזמינו ב-Booking.com",
        airbnb: "הזמינו ב-Airbnb",
        agoda: "הזמינו ב-Agoda",
        tripCom: "הזמינו ב-Trip.com"
      },
      cta: {
        badge: "מלון שרפה סול • תאמל, קטמנדו",
        heading: "מוכנים לשינה שקטה ואיכותית?",
        copy: "התארחו בלב תאמל והפכו את מלון שרפה סול לבסיס הנוח והשקט שלכם בקטמנדו ובמסעכם בנפאל.",
        button: "הזמינו את שהייתכם"
      },
      copyright: {
        prefix: "©",
        hotelName: "מלון שרפה סול",
        suffix: "כל הזכויות שמורות."
      },
      legal: {
        privacy: "מדיניות פרטיות",
        terms: "תנאי שימוש",
        guestGuide: "מדריך לאורח וכללי הבית",
        cookies: "העדפות עוגיות",
        cms: "פורטל CMS"
      }
    }
  },

  ne: {
    roomsCard: {
      categoriesAvailable: "३ प्रकारका कोठाहरू उपलब्ध छन्",
      onlyLeft: "२ वटा मात्र कोठा बाँकी!",
      perNight: "/ रात",
      directOff: "१०% प्रत्यक्ष छुट"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "द्रुत गतिको फाइबर वाइफाइ",
      "1_king_bed___1_single_bed": "१ किङ बेड + १ सिंगल बेड",
      "1_king_size_bed": "१ किङ साइज बेड",
      private_attached_bathroom__24_7_hot_water_: "निजी जोडिएको बाथरूम (२४/७ तातो पानी)",
      private_ensuite_bathroom__24_7_hot_water_: "निजी जोडिएको बाथरूम (२४/७ तातो पानी)",
      ceiling_fan___heating: "सिलिङ फ्यान / कोठा तताउने सुविधा",
      shared_guest_kitchen_access: "साझा भान्सा कोठाको सुविधा",
      complimentary_trekker_luggage_storage: "पदयात्रीका लागि निःशुल्क लगेज भण्डारण",
      daily_housekeeping: "दैनिक कोठा सरसफाइ सेवा",
      "24_7_front_desk_assistance": "२४/७ फ्रन्ट डेस्क सहयोग",
      air_conditioning__ac_: "वातानुकूलित (एसी)",
      work_desk___seating: "काम गर्ने डेस्क तथा बस्ने कुर्सी",
      comfortable_seating_area: "आरामदायी बस्ने ठाउँ"
    },
    contact: {
      card: {
        quick: { title: "द्रुत प्रतिक्रिया", des: "२४ घण्टाभित्र" },
        res: { title: "द्रुत प्रतिक्रिया", des: "२४ घण्टाभित्र" },
        per: { title: "पारिवारिक व्यवहार", des: "समर्पित सहयोग" }
      },
      form: {
        desc: "तलको फारम भर्नुहोस् र हामी तपाईंलाई तुरुन्त सम्पर्क गर्नेछौं!",
        placeholders: {
          name: "आफ्नो पूरा नाम लेख्नुहोस्",
          phone: "+977 98XXXXXXXX",
          message: "आफ्नो जिज्ञासा वा बुकिङ मितिबारे लेख्नुहोस्..."
        }
      }
    },
    getInTouch: {
      visitDetail: "२६ ठमेल भगवती मार्ग, काठमाडौं ४४६००, नेपाल"
    },
    aboutstats: {
      title1: "घरभन्दा टाढा आफ्नो",
      title2: "घर",
      para1: "हाम्रो न्यानो तथा पारिवारिक होटलमा शेर्पा समुदायको वास्तविक आतिथ्यताको अनुभव लिनुहोस्। हाम्रो पारिवारिक होटलले सबै आवश्यक सुविधाहरू सहित न्यानो र व्यक्तिगत सेवा प्रदान गर्दछ।",
      para2: "तपाईं पदयात्रा, भ्रमण वा विश्रामका लागि आउनुभएको होस्, हामी सफा, सुरक्षित र स्वागतयोग्य वातावरण प्रदान गर्दछौं जहाँ हरेक पाहुनालाई परिवार सरह सम्मान गरिन्छ।",
      amenities: {
        "1": "आरामदायी कोठाहरू",
        "2": "भवनभरि द्रुत गतिको वाइफाइ",
        "3": "उत्कृष्ट तथा शान्त स्थान",
        "4": "अनुरोधमा विमानस्थल सेवा"
      },
      stat: {
        "1": "२४/७ फ्रन्ट डेस्क सहयोग",
        "2": "१००% शान्त तथा पारिवारिक",
        "3": "प्रत्यक्ष बुकिङमा १०% छुट",
        "4": "निःशुल्क लगेज भण्डारण"
      }
    },
    footer: {
      brand: {
        title: "होटल शेर्पा सोल",
        tagline: "रेस्टुरेन्ट छैन। होहल्ला छैन। मीठो निद्रा।",
        description: "होटल शेर्पा सोल ठमेल, काठमाडौंमा अवस्थित एक शान्त र आरामदायी होटल हो, जुन सुविधाजनक स्थान र शान्त विश्राम चाहने यात्रुहरूका लागि बनाइएको हो।"
      },
      followUs: { title: "हामीलाई पछ्याउनुहोस्" },
      quickLinks: {
        title: "छिटो लिङ्कहरू",
        links: {
          home: "गृहपृष्ठ",
          rooms: "कोठाहरू तथा सुइटहरू",
          aboutUs: "हाम्रो बारेमा",
          services: "सेवा तथा सुविधाहरू",
          gallery: "फोटो ग्यालरी",
          blog: "यात्रा ब्लग",
          guestGuide: "अतिथि मार्गदर्शिका",
          contact: "सम्पर्क तथा ठेगाना"
        }
      },
      contactUs: {
        title: "सम्पर्क गर्नुहोस्",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "२६ ठमेल भगवती मार्ग, काठमाडौं ४४६००, नेपाल"
      },
      otas: {
        title: "प्रमुख अनलाइन प्लेटफर्महरूमा बुक गर्नुहोस्",
        bookingCom: "Booking.com मा बुक गर्नुहोस्",
        airbnb: "Airbnb मा बुक गर्नुहोस्",
        agoda: "Agoda मा बुक गर्नुहोस्",
        tripCom: "Trip.com मा बुक गर्नुहोस्"
      },
      cta: {
        badge: "होटल शेर्पा सोल • ठमेल, काठमाडौं",
        heading: "शान्त र मीठो निद्राको लागि तयार हुनुहुन्छ?",
        copy: "ठमेलको मुटुमा बस्नुहोस् र काठमाडौं तथा नेपाल भ्रमणको लागि होटल शेर्पा सोललाई आफ्नो आरामदायी आधार बनाउनुहोस्।",
        button: "आफ्नो कोठा बुक गर्नुहोस्"
      },
      copyright: {
        prefix: "©",
        hotelName: "होटल शेर्पा सोल",
        suffix: "सर्वाधिकार सुरक्षित।"
      },
      legal: {
        privacy: "गोपनीयता नीति",
        terms: "सेवाका सर्तहरू",
        guestGuide: "अतिथि मार्गदर्शिका तथा नियमहरू",
        cookies: "कुकी प्राथमिकताहरू",
        cms: "CMS पोर्टल"
      }
    }
  },

  hi: {
    roomsCard: {
      categoriesAvailable: "3 प्रकार के कमरे उपलब्ध",
      onlyLeft: "केवल 2 कमरे शेष!",
      perNight: "/ रात",
      directOff: "10% सीधी छूट"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "हाई-स्पीड फाइबर वाई-फाई",
      "1_king_bed___1_single_bed": "1 किंग बेड + 1 सिंगल बेड",
      "1_king_size_bed": "1 किंग साइज बेड",
      private_attached_bathroom__24_7_hot_water_: "अटैच्ड प्राइवेट बाथरूम (24/7 गर्म पानी)",
      private_ensuite_bathroom__24_7_hot_water_: "प्राइवेट संलग्न बाथरूम (24/7 गर्म पानी)",
      ceiling_fan___heating: "सीलिंग फैन / हीटिंग",
      shared_guest_kitchen_access: "साझा अतिथि रसोई सुविधा",
      complimentary_trekker_luggage_storage: "ट्रेकर्स के लिए मुफ्त सामान भंडारण",
      daily_housekeeping: "दैनिक हाउसकीपिंग सेवा",
      "24_7_front_desk_assistance": "24/7 फ्रंट डेस्क सहायता",
      air_conditioning__ac_: "एयर कंडीशनर (AC)",
      work_desk___seating: "वर्क डेस्क और बैठने की व्यवस्था",
      comfortable_seating_area: "आरामदायक बैठक क्षेत्र"
    },
    contact: {
      card: {
        quick: { title: "त्वरित प्रतिक्रिया", des: "24 घंटे के भीतर" },
        res: { title: "त्वरित प्रतिक्रिया", des: "24 घंटे के भीतर" },
        per: { title: "व्यक्तिगत ध्यान", des: "समर्पित सहायता" }
      },
      form: {
        desc: "नीचे दिया गया फॉर्म भरें और हम जल्द ही आपसे संपर्क करेंगे!",
        placeholders: {
          name: "अपना पूरा नाम दर्ज करें",
          phone: "+977 98XXXXXXXX",
          message: "अपनी पूछताछ, बुकिंग तिथियों या आवश्यकताओं के बारे में बताएं..."
        }
      }
    },
    getInTouch: {
      visitDetail: "26 थमेल भगवती मार्ग, काठमांडू 44600, नेपाल"
    },
    aboutstats: {
      title1: "घर से दूर अपना",
      title2: "घर",
      para1: "हमारे आरामदायक होटल में प्रामाणिक शेरपा आतिथ्य का अनुभव करें। हमारा मानना है कि आरामदायक आवास महंगा नहीं होना चाहिए। हमारा पारिवारिक होटल हर आवश्यक सुविधा के साथ गर्मजोशी से भरी व्यक्तिगत सेवा प्रदान करता है।",
      para2: "चाहे आप ट्रेकिंग, दर्शनीय स्थलों की यात्रा या विश्राम के लिए आए हों, हम एक स्वच्छ, सुरक्षित और स्वागत योग्य वातावरण प्रदान करते हैं जहाँ हर अतिथि को परिवार की तरह माना जाता है।",
      amenities: {
        "1": "आरामदायक कमरे",
        "2": "पूरे भवन में तेज वाई-फाई",
        "3": "प्रमुख एवं शांत स्थान",
        "4": "अनुरोध पर पिकअप सेवा"
      },
      stat: {
        "1": "24/7 फ्रंट डेस्क सहायता",
        "2": "100% शांत और सुकून भरा",
        "3": "सीधी बुकिंग पर 10% छूट",
        "4": "मुफ्त लगेज स्टोरेज"
      }
    },
    footer: {
      brand: {
        title: "होटल शेरपा सोल",
        tagline: "कोई रेस्टोरेंट नहीं। कोई शोर नहीं। सुकून भरी नींद।",
        description: "होटल शेरपा सोल थमेल, काठमांडू में एक शांत और आरामदायक होटल है, जो सुविधाजनक स्थान और सुकून भरी नींद चाहने वाले यात्रियों के लिए बनाया गया है।"
      },
      followUs: { title: "सोशल मीडिया" },
      quickLinks: {
        title: "त्वरित लिंक",
        links: {
          home: "मुख्य पृष्ठ",
          rooms: "कमरे और सुइट्स",
          aboutUs: "हमारे बारे में",
          services: "सेवाएं और सुविधाएं",
          gallery: "फोटो गैलरी",
          blog: "यात्रा ब्लॉग",
          guestGuide: "अतिथि मार्गदर्शिका",
          contact: "संपर्क और स्थान"
        }
      },
      contactUs: {
        title: "संपर्क करें",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "26 थमेल भगवती मार्ग, काठमांडू 44600, नेपाल"
      },
      otas: {
        title: "शीर्ष ऑनलाइन प्लेटफॉर्म्स पर बुक करें",
        bookingCom: "Booking.com पर बुक करें",
        airbnb: "Airbnb पर बुक करें",
        agoda: "Agoda पर बुक करें",
        tripCom: "Trip.com पर बुक करें"
      },
      cta: {
        badge: "होटल शेरपा सोल • थमेल, काठमांडू",
        heading: "क्या आप सुकून भरी नींद के लिए तैयार हैं?",
        copy: "थमेल के केंद्र में ठहरें और काठमांडू तथा नेपाल यात्रा के लिए होटल शेरपा सोल को अपना आरामदायक आधार बनाएं।",
        button: "अपना कमरा बुक करें"
      },
      copyright: {
        prefix: "©",
        hotelName: "होटल शेरपा सोल",
        suffix: "सर्वाधिकार सुरक्षित।"
      },
      legal: {
        privacy: "गोपनीयता नीति",
        terms: "सेवा की शर्तें",
        guestGuide: "अतिथि मार्गदर्शिका और नियम",
        cookies: "कुकी प्राथमिकताएं",
        cms: "CMS पोर्टल"
      }
    }
  },

  ch: {
    roomsCard: {
      categoriesAvailable: "提供3种精选客房房型",
      onlyLeft: "仅剩最后2间客房！",
      perNight: "/ 晚",
      directOff: "官网直订立享9折"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "高速光纤无线网络",
      "1_king_bed___1_single_bed": "1张特大床 + 1张单人床",
      "1_king_size_bed": "1张豪华特大床",
      private_attached_bathroom__24_7_hot_water_: "独立卫浴套间 (24小时充沛热水)",
      private_ensuite_bathroom__24_7_hot_water_: "客房独立卫生间 (24小时充沛热水)",
      ceiling_fan___heating: "吊扇 / 电暖设备",
      shared_guest_kitchen_access: "住客共享自助厨房使用权",
      complimentary_trekker_luggage_storage: "徒步登山客免费安全行李寄存",
      daily_housekeeping: "每日客房清洁整理",
      "24_7_front_desk_assistance": "24小时前台贴心服务",
      air_conditioning__ac_: "冷暖空调 (AC)",
      work_desk___seating: "办公书桌与舒适座椅",
      comfortable_seating_area: "惬意休息会客区"
    },
    contact: {
      card: {
        quick: { title: "快速响应", des: "24小时内极速回复" },
        res: { title: "快速响应", des: "24小时内极速回复" },
        per: { title: "贴心服务", des: "专属管家全程协助" }
      },
      form: {
        desc: "请填写以下表格，我们将在第一时间与您取得联系！",
        placeholders: {
          name: "请输入您的姓名",
          phone: "+977 98XXXXXXXX",
          message: "请告诉我们您的咨询需求、入住日期或特殊要求..."
        }
      }
    },
    getInTouch: {
      visitDetail: "尼泊尔加德满都泰米尔巴格瓦蒂街26号 (邮编 44600)"
    },
    aboutstats: {
      title1: "您在远方的温馨之",
      title2: "家",
      para1: "在我们温馨的精品客栈中体验纯正温厚的夏尔巴待客之道。我们始终坚信，舒适品质的住宿无需昂贵门槛。家庭式经营带来细致入微、体贴周到的专属关怀。",
      para2: "无论您是前往喜马拉雅徒步、深度游览加德满都，还是旅途小憩，我们都为您提供干净、安全、宾至如归的居住环境。",
      amenities: {
        "1": "舒适静谧客房",
        "2": "全楼覆盖高速无线网络",
        "3": "泰米尔黄金静谧地段",
        "4": "机场接送预约服务"
      },
      stat: {
        "1": "24小时前台贴心服务",
        "2": "100% 宁静无噪音客房",
        "3": "官网直接预订立享9折",
        "4": "免费徒步装备行李寄存"
      }
    },
    footer: {
      brand: {
        title: "夏尔巴之魂酒店",
        tagline: "无餐厅喧哗 • 无噪音干扰 • 尽享安睡",
        description: "夏尔巴之魂酒店是位于加德满都泰米尔核心区的一家静谧舒适精品酒店，专为寻求便利位置、舒适客房与优质睡眠的全球旅行者打造。"
      },
      followUs: { title: "关注我们" },
      quickLinks: {
        title: "快速导航",
        links: {
          home: "首页",
          rooms: "客房与套房",
          aboutUs: "关于我们",
          services: "服务与设施",
          gallery: "照片画廊",
          blog: "旅行博客",
          guestGuide: "住客入住指南",
          contact: "联系与位置"
        }
      },
      contactUs: {
        title: "联系我们",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "尼泊尔加德满都泰米尔巴格瓦蒂街26号"
      },
      otas: {
        title: "在主流预订平台预订",
        bookingCom: "在 Booking.com 预订",
        airbnb: "在 Airbnb 预订",
        agoda: "在 Agoda 预订",
        tripCom: "在携程 Trip.com 预订"
      },
      cta: {
        badge: "夏尔巴之魂酒店 • 加德满都泰米尔",
        heading: "准备好享受宁静舒适的深度睡眠了吗？",
        copy: "入住泰米尔核心街区，让夏尔巴之魂酒店成为您加德满都与尼泊尔喜马拉雅探索之旅的宁静港湾。",
        button: "立即预订客房"
      },
      copyright: {
        prefix: "©",
        hotelName: "夏尔巴之魂酒店",
        suffix: "版权所有。"
      },
      legal: {
        privacy: "隐私政策",
        terms: "服务条款",
        guestGuide: "住客指南与入住守则",
        cookies: "Cookie 偏好设置",
        cms: "CMS 管理后台"
      }
    }
  },

  ja: {
    roomsCard: {
      categoriesAvailable: "3つの客室カテゴリーをご用意",
      onlyLeft: "残りわずか2室！",
      perNight: "/ 泊",
      directOff: "直販予約で10%OFF"
    },
    roomAmenities: {
      high_speed_fiber_wi_fi: "高速光ファイバーWi-Fi",
      "1_king_bed___1_single_bed": "キングベッド1台 + シングルベッド1台",
      "1_king_size_bed": "大型キングサイズベッド1台",
      private_attached_bathroom__24_7_hot_water_: "専用バスルーム完備 (24時間温水シャワー)",
      private_ensuite_bathroom__24_7_hot_water_: "専用エンスイートバス (24時間温水シャワー)",
      ceiling_fan___heating: "シーリングファン / 暖房",
      shared_guest_kitchen_access: "宿泊者専用の共有キッチンのご利用",
      complimentary_trekker_luggage_storage: "トレッキング中の無料荷物預かりサービス",
      daily_housekeeping: "毎日の客室清掃サービス",
      "24_7_front_desk_assistance": "24時間フロント対応",
      air_conditioning__ac_: "個別エアコン完備 (AC)",
      work_desk___seating: "ワークデスク＆快適チェア",
      comfortable_seating_area: "くつろげるリビングエリア"
    },
    contact: {
      card: {
        quick: { title: "迅速な対応", des: "24時間以内にご返信" },
        res: { title: "迅速な対応", des: "24時間以内にご返信" },
        per: { title: "親身なサポート", des: "お客様一人ひとりに丁寧に対応" }
      },
      form: {
        desc: "以下のフォームにご記入ください。折り返しご連絡いたします！",
        placeholders: {
          name: "お名前を入力してください",
          phone: "+977 98XXXXXXXX",
          message: "ご質問、ご宿泊日程、ご要望などをお知らせください..."
        }
      }
    },
    getInTouch: {
      visitDetail: "ネパール カトマンズ 44600、タメル・バガワティ・マルグ26"
    },
    aboutstats: {
      title1: "旅先で我が家のように寛げる",
      title2: "場所",
      para1: "温かみのある当ホテルで、シェルパの心からのホスピタリティをご体験ください。快適な滞在に高額な料金は必要ありません。家族経営ならではの丁寧で行き届いたおもてなしを提供します。",
      para2: "ヒマラヤトレッキング、市内観光、または長旅の休息など、どのお客様も家族のように温かくお迎えし、清潔で安全な環境をご用意しています。",
      amenities: {
        "1": "清潔で快適な客室",
        "2": "館内全域の高速Wi-Fi",
        "3": "タメル中心の抜群の立地",
        "4": "空港送迎手配（リクエスト制）"
      },
      stat: {
        "1": "24時間フロント対応",
        "2": "100% 静かで穏やかな環境",
        "3": "直販予約で10%割引",
        "4": "無料トレッカー荷物預かり"
      }
    },
    footer: {
      brand: {
        title: "ホテル・シェルパ・ソウル",
        tagline: "レストランなし。騒音なし。快適な睡眠。",
        description: "ホテル・シェルパ・ソウルは、便利な立地、清潔で快適な客室、上質な睡眠を求める旅行者のためのタメルの静かなブティックホテルです。"
      },
      followUs: { title: "公式SNS" },
      quickLinks: {
        title: "クイックリンク",
        links: {
          home: "ホーム",
          rooms: "客室＆スイート",
          aboutUs: "ホテル紹介",
          services: "サービス＆設備",
          gallery: "フォトギャラリー",
          blog: "旅行ブログ",
          guestGuide: "ゲストガイド",
          contact: "お問い合わせ＆アクセス"
        }
      },
      contactUs: {
        title: "お問い合わせ",
        phone: "+977 9851068219 / +977-1-4530311",
        email: "info@hotelsherpasoul.com",
        address: "ネパール カトマンズ 44600、タメル・バガワティ・マルグ26"
      },
      otas: {
        title: "主要予約サイトで予約",
        bookingCom: "Booking.comで予約",
        airbnb: "Airbnbで予約",
        agoda: "Agodaで予約",
        tripCom: "Trip.comで予約"
      },
      cta: {
        badge: "ホテル・シェルパ・ソウル • カトマンズ・タメル",
        heading: "静かで快適な睡眠をお届けします",
        copy: "タメルの中心に滞在し、ホテル・シェルパ・ソウルをカトマンズやネパール旅行の快適な拠点にしてください。",
        button: "今すぐ予約する"
      },
      copyright: {
        prefix: "©",
        hotelName: "ホテル・シェルパ・ソウル",
        suffix: "All rights reserved."
      },
      legal: {
        privacy: "プライバシーポリシー",
        terms: "利用規約",
        guestGuide: "ゲストガイド＆ハウスルール",
        cookies: "クッキー設定",
        cms: "CMSポータル"
      }
    }
  }
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const allLangs = ['en', 'ne', 'hi', 'es', 'fra', 'de', 'it', 'pt', 'nl', 'rs', 'ch', 'ja', 'ko', 'ar', 'he'];

for (const lang of allLangs) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File ${filePath} not found`);
    continue;
  }
  const current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const patch = GAP_DATA[lang] || GAP_DATA['en'];
  deepMerge(current, patch);
  fs.writeFileSync(filePath, JSON.stringify(current, null, 2), 'utf8');
  console.log(`✓ Applied gap translations for ${lang}.json`);
}

console.log('\nAll gap translations merged successfully into src/Locales/*.json');
