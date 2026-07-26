import { SurvivalPOI } from "./survival-kit-types";

export const survivalPOIs: SurvivalPOI[] = [
  // ══════════════════════════════════════════════════════════════════
  //  TOKYO
  // ══════════════════════════════════════════════════════════════════
  { id: "tk-w1", name: "Fuente Parque Ueno", category: "water", city: "tokyo", lat: 35.7148, lng: 139.7743, description: "Fuente pública junto al lago del parque. Zona tranquila." },
  { id: "tk-w2", name: "Fuente Estación Shinjuku", category: "water", city: "tokyo", lat: 35.6896, lng: 139.7006, description: "Bebedero en la salida este de Shinjuku Station." },
  { id: "tk-w3", name: "Fuente Jardín Imperial", category: "water", city: "tokyo", lat: 35.6852, lng: 139.7528, description: "Junto a la entrada del Jardín Imperial." },
  { id: "tk-t1", name: "Baños Parque Ueno", category: "toilet", city: "tokyo", lat: 35.7138, lng: 139.7731, description: "Baños limpios junto al Museo Nacional. Incluye cambiador." },
  { id: "tk-t2", name: "Baños Estación Shibuya", category: "toilet", city: "tokyo", lat: 35.6580, lng: 139.7016, description: "Baños en la planta B1 del Shibuya Station. Occidentales disponibles." },
  { id: "tk-t3", name: "Baños Parque Yoyogi", category: "toilet", city: "tokyo", lat: 35.6717, lng: 139.6949, description: "Baños públicos cerca de la fuente principal." },
  { id: "tk-a1", name: "7-Eleven Shibuya", category: "atm", city: "tokyo", lat: 35.6595, lng: 139.7004, description: "ATM 7-Bank. Acepta tarjetas extranjeras (Visa, Mastercard)." },
  { id: "tk-a2", name: "JP Post Shinjuku", category: "atm", city: "tokyo", lat: 35.6938, lng: 139.7034, description: "ATM Japan Post. Acepta tarjetas internacionales. Horario limitado." },
  { id: "tk-a3", name: "ATM Estación Tokyo", category: "atm", city: "tokyo", lat: 35.6812, lng: 139.7671, description: "Múltiples ATMs en la estación principal. 7-Bank y JP Post." },
  { id: "tk-l1", name: "Taquillas Estación Shinjuku", category: "locker", city: "tokyo", lat: 35.6896, lng: 139.7006, description: "Taquillas grandes ¥400-700. Zona Central Sur." },
  { id: "tk-l2", name: "Taquillas Estación Tokyo", category: "locker", city: "tokyo", lat: 35.6812, lng: 139.7671, description: "Taquillas en Marunouchi Exit. ¥400-800 según tamaño." },
  { id: "tk-wi1", name: "WiFi Shibuya Center", category: "wifi", city: "tokyo", lat: 35.6592, lng: 139.7005, description: "WiFi gratuito del ayuntamiento. SSID: free_wifi_shibuya" },
  { id: "tk-wi2", name: "WiFi Parque Ueno", category: "wifi", city: "tokyo", lat: 35.7140, lng: 139.7730, description: "WiFi público en zona de museos." },
  { id: "tk-k1", name: "7-Eleven Shinjuku East", category: "konbini", city: "tokyo", lat: 35.6935, lng: 139.7085, description: "Abierto 24h. ATM, baño, cafetera." },
  { id: "tk-k2", name: "FamilyMart Shibuya", category: "konbini", city: "tokyo", lat: 35.6590, lng: 139.7010, description: "Abierto 24h. Carga IC card disponible." },
  { id: "tk-k3", name: "Lawson Ueno", category: "konbini", city: "tokyo", lat: 35.7142, lng: 139.7760, description: "Abierto 24h. Cerca del parque." },
  { id: "tk-tr1", name: "Papelera Estación Shinjuku", category: "trash", city: "tokyo", lat: 35.6896, lng: 139.7006, description: "Contenedores clasificados junto a la salida. Separados por tipo." },
  { id: "tk-tr2", name: "Papelera Parque Yoyogi", category: "trash", city: "tokyo", lat: 35.6717, lng: 139.6950, description: "Zona de reciclaje en la entrada principal del parque." },
  { id: "tk-ph1", name: "Matsumoto Kiyoshi Shibuya", category: "pharmacy", city: "tokyo", lat: 35.6595, lng: 139.7005, description: "Farmacia grande. Medicinas, cosméticos, tax-free." },
  { id: "tk-ph2", name: "Tomod's Shinjuku", category: "pharmacy", city: "tokyo", lat: 35.6935, lng: 139.7034, description: "Farmacia 24h en Shinjuku. Productos japoneses." },
  { id: "tk-sm1", name: "Zona fumar Shinjuku Station", category: "smoking", city: "tokyo", lat: 35.6896, lng: 139.7000, description: "Zona cubierta cerca de la salida este. Prohibido fumar en la calle." },
  { id: "tk-sm2", name: "Zona fumar Shibuya", category: "smoking", city: "tokyo", lat: 35.6590, lng: 139.7013, description: "Cabinas de fumar en la plaza Shibuya 109." },
  { id: "tk-ti1", name: "Oficina Turismo Shinjuku", category: "tourist_info", city: "tokyo", lat: 35.6896, lng: 139.7006, description: "Info en español. Mapas, cupones, reservas." },
  { id: "tk-ti2", name: "Oficina Turismo Tokyo Station", category: "tourist_info", city: "tokyo", lat: 35.6812, lng: 139.7671, description: "Centro de información multilingüe en Marunouchi." },

  // ══════════════════════════════════════════════════════════════════
  //  KYOTO
  // ══════════════════════════════════════════════════════════════════
  { id: "ky-w1", name: "Fuente Templo Kinkaku-ji", category: "water", city: "kyoto", lat: 35.0394, lng: 135.7292, description: "Fuente junto al estanque del Templo Dorado." },
  { id: "ky-w2", name: "Fuente Parque Maruyama", category: "water", city: "kyoto", lat: 35.0036, lng: 135.7825, description: "Fuente en el parque más popular de Kioto." },
  { id: "ky-w3", name: "Fuente Estación Kyoto", category: "water", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Bebedero en la salida Central." },
  { id: "ky-t1", name: "Baños Fushimi Inari", category: "toilet", city: "kyoto", lat: 34.9671, lng: 135.7727, description: "Baños limpios cerca de la entrada. Incluye occidentales." },
  { id: "ky-t2", name: "Baños Templo Kiyomizu", category: "toilet", city: "kyoto", lat: 34.9949, lng: 135.7850, description: "Baños públicos en la zona de comercios." },
  { id: "ky-t3", name: "Baños Arashiyama", category: "toilet", city: "kyoto", lat: 35.0095, lng: 135.6721, description: "Baños junto al puente Togetsukyo." },
  { id: "ky-a1", name: "7-Eleven Kyoto Station", category: "atm", city: "kyoto", lat: 34.9858, lng: 135.7580, description: "ATM 7-Bank en la estación. Acepta extranjeras." },
  { id: "ky-a2", name: "JP Post Gion", category: "atm", city: "kyoto", lat: 35.0036, lng: 135.7755, description: "ATM en oficina de correos de Gion." },
  { id: "ky-l1", name: "Taquillas Estación Kyoto", category: "locker", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Taquillas en Central Exit. ¥400-700." },
  { id: "ky-l2", name: "Taquillas Arashiyama", category: "locker", city: "kyoto", lat: 35.0095, lng: 135.6730, description: "Taquillas cerca del tren de Arashiyama." },
  { id: "ky-wi1", name: "WiFi Parque Maruyama", category: "wifi", city: "kyoto", lat: 35.0036, lng: 135.7820, description: "WiFi público municipal." },
  { id: "ky-k1", name: "7-Eleven Gion", category: "konbini", city: "kyoto", lat: 35.0036, lng: 135.7760, description: "Abierto 24h. Zona Gion." },
  { id: "ky-k2", name: "FamilyMart Kyoto Station", category: "konbini", city: "kyoto", lat: 34.9855, lng: 135.7590, description: "Abierto 24h. Salida Central." },
  { id: "ky-tr1", name: "Papelera Fushimi Inari", category: "trash", city: "kyoto", lat: 34.9671, lng: 135.7725, description: "Contenedores en la entrada del santuario. Clasificados." },
  { id: "ky-tr2", name: "Papelera Estación Kyoto", category: "trash", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Zona de reciclaje en la salida Central." },
  { id: "ky-ph1", name: "Matsumoto Kiyoshi Shijo", category: "pharmacy", city: "kyoto", lat: 35.0036, lng: 135.7700, description: "Farmacia en el centro de Kioto. Medicinas típicas japonesas." },
  { id: "ky-sm1", name: "Zona fumar Estación Kyoto", category: "smoking", city: "kyoto", lat: 34.9858, lng: 135.7585, description: "Cabinas de fumar en la salida Karasuma." },
  { id: "ky-ti1", name: "Oficina Turismo Kioto", category: "tourist_info", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Info multilingüe en la estación. Mapas gratuitos." },

  // ══════════════════════════════════════════════════════════════════
  //  OSAKA
  // ══════════════════════════════════════════════════════════════════
  { id: "os-w1", name: "Fuente Parque Osaka Castle", category: "water", city: "osaka", lat: 34.6873, lng: 135.5262, description: "Fuente junto al castillo. Zona de picnic." },
  { id: "os-w2", name: "Fuente Namba Parks", category: "water", city: "osaka", lat: 34.6644, lng: 135.5000, description: "Fuente en la terraza del centro comercial." },
  { id: "os-w3", name: "Fuente Dotonbori", category: "water", city: "osaka", lat: 34.6686, lng: 135.5013, description: "Fuente cerca del canal Dotonbori." },
  { id: "os-t1", name: "Baños Dotonbori", category: "toilet", city: "osaka", lat: 34.6687, lng: 135.5010, description: "Baños públicos junto al canal. Occidentales." },
  { id: "os-t2", name: "Baños Estación Osaka", category: "toilet", city: "osaka", lat: 34.7024, lng: 135.4959, description: "Baños en la estación principal. Múltiples." },
  { id: "os-t3", name: "Baños Parque Nakanoshima", category: "toilet", city: "osaka", lat: 34.6920, lng: 135.4900, description: "Baños junto al río." },
  { id: "os-a1", name: "7-Eleven Namba", category: "atm", city: "osaka", lat: 34.6660, lng: 135.5016, description: "ATM 7-Bank. Abierto 24h." },
  { id: "os-a2", name: "ATM Shinsaibashi", category: "atm", city: "osaka", lat: 34.6750, lng: 135.5020, description: "ATM en calle Shinsaibashi." },
  { id: "os-l1", name: "Taquillas Namba", category: "locker", city: "osaka", lat: 34.6660, lng: 135.5016, description: "Taquillas en estación Namba. ¥400-700." },
  { id: "os-l2", name: "Taquillas Dotonbori", category: "locker", city: "osaka", lat: 34.6686, lng: 135.5013, description: "Taquillas cerca del canal." },
  { id: "os-wi1", name: "WiFi Osaka Castle Park", category: "wifi", city: "osaka", lat: 34.6873, lng: 135.5260, description: "WiFi público en el parque." },
  { id: "os-k1", name: "Lawson Dotonbori", category: "konbini", city: "osaka", lat: 34.6689, lng: 135.5015, description: "Abierto 24h. Zona turística." },
  { id: "os-k2", name: "7-Eleven Shinsaibashi", category: "konbini", city: "osaka", lat: 34.6752, lng: 135.5018, description: "Abierto 24h. Calle principal." },
  { id: "os-tr1", name: "Papelera Dotonbori", category: "trash", city: "osaka", lat: 34.6686, lng: 135.5012, description: "Contenedores clasificados junto al canal." },
  { id: "os-tr2", name: "Papelera Parque Osaka Castle", category: "trash", city: "osaka", lat: 34.6873, lng: 135.5260, description: "Zona de reciclaje en el parque del castillo." },
  { id: "os-ph1", name: "Matsumoto Kiyoshi Namba", category: "pharmacy", city: "osaka", lat: 34.6660, lng: 135.5014, description: "Farmacia grande 24h. Cosméticos y medicinas." },
  { id: "os-ph2", name: "Tomod's Umeda", category: "pharmacy", city: "osaka", lat: 34.7055, lng: 135.4980, description: "Farmacia en la zona de Umeda." },
  { id: "os-sm1", name: "Zona fumar Umeda", category: "smoking", city: "osaka", lat: 34.7055, lng: 135.4980, description: "Cabinas de fumar en HEP FIVE plaza." },
  { id: "os-ti1", name: "Oficina Turismo Osaka", category: "tourist_info", city: "osaka", lat: 34.7024, lng: 135.4959, description: "Info en español. Cupones de descuento para atractivos." },

  // ══════════════════════════════════════════════════════════════════
  //  HIROSHIMA
  // ══════════════════════════════════════════════════════════════════
  { id: "hi-w1", name: "Fuente Parque Peace", category: "water", city: "hiroshima", lat: 34.3955, lng: 132.4536, description: "Fuente cerca del Domo de la Paz." },
  { id: "hi-w2", name: "Fuente Jardín Shukkeien", category: "water", city: "hiroshima", lat: 34.3976, lng: 132.4656, description: "Fuente en el jardín histórico." },
  { id: "hi-t1", name: "Baños Parque Peace", category: "toilet", city: "hiroshima", lat: 34.3950, lng: 132.4530, description: "Baños en la zona memorial." },
  { id: "hi-t2", name: "Baños Estación Hiroshima", category: "toilet", city: "hiroshima", lat: 34.3977, lng: 132.4760, description: "Baños limpios en la estación." },
  { id: "hi-a1", name: "JP Post Hiroshima", category: "atm", city: "hiroshima", lat: 34.3977, lng: 132.4755, description: "ATM Japan Post en la estación." },
  { id: "hi-l1", name: "Taquillas Estación Hiroshima", category: "locker", city: "hiroshima", lat: 34.3977, lng: 132.4760, description: "Taquillas ¥400-700." },
  { id: "hi-wi1", name: "WiFi Parque Peace", category: "wifi", city: "hiroshima", lat: 34.3955, lng: 132.4535, description: "WiFi gratuito del ayuntamiento." },
  { id: "hi-k1", name: "7-Eleven Peace Park", category: "konbini", city: "hiroshima", lat: 34.3960, lng: 132.4530, description: "Abierto 24h. Cerca del parque." },
  { id: "hi-tr1", name: "Papelera Parque Peace", category: "trash", city: "hiroshima", lat: 34.3955, lng: 132.4535, description: "Contenedores en la zona del Memorial." },
  { id: "hi-ph1", name: "Matsumoto Kiyoshi Hatchobori", category: "pharmacy", city: "hiroshima", lat: 34.3940, lng: 132.4570, description: "Farmacia cerca del centro." },
  { id: "hi-sm1", name: "Zona fumar Estación Hiroshima", category: "smoking", city: "hiroshima", lat: 34.3977, lng: 132.4758, description: "Zona designada en la estación." },
  { id: "hi-ti1", name: "Oficina Turismo Hiroshima", category: "tourist_info", city: "hiroshima", lat: 34.3955, lng: 132.4535, description: "Info en el Peace Memorial Park. Multilingüe." },

  // ══════════════════════════════════════════════════════════════════
  //  NARA
  // ══════════════════════════════════════════════════════════════════
  { id: "na-w1", name: "Fuente Parque Nara", category: "water", city: "nara", lat: 34.6851, lng: 135.8430, description: "Fuente junto a los ciervos del parque." },
  { id: "na-w2", name: "Fuente Templo Todai-ji", category: "water", city: "nara", lat: 34.6891, lng: 135.8398, description: "Fuente en la entrada del gran templo." },
  { id: "na-t1", name: "Baños Parque Nara", category: "toilet", city: "nara", lat: 34.6851, lng: 135.8435, description: "Baños públicos cerca de los ciervos." },
  { id: "na-t2", name: "Baños Kasuga Taisha", category: "toilet", city: "nara", lat: 34.6811, lng: 135.8497, description: "Baños junto al santuario." },
  { id: "na-a1", name: "ATM Nara Station", category: "atm", city: "nara", lat: 34.6833, lng: 135.8226, description: "ATM en la estación JR." },
  { id: "na-l1", name: "Taquillas Nara Station", category: "locker", city: "nara", lat: 34.6833, lng: 135.8226, description: "Taquillas ¥400." },
  { id: "na-k1", name: "FamilyMart Nara", category: "konbini", city: "nara", lat: 34.6830, lng: 135.8230, description: "Abierto 24h. Cerca de la estación." },
  { id: "na-tr1", name: "Papelera Parque Nara", category: "trash", city: "nara", lat: 34.6851, lng: 135.8430, description: "Contenedores en la entrada del parque. ¡Cuidado con los ciervos!" },
  { id: "na-ph1", name: "Farmacia Nara Station", category: "pharmacy", city: "nara", lat: 34.6833, lng: 135.8228, description: "Farmacia cerca de la estación JR." },
  { id: "na-ti1", name: "Oficina Turismo Nara", category: "tourist_info", city: "nara", lat: 34.6833, lng: 135.8226, description: "Info en la estación. Mapas del parque de ciervos." },

  // ══════════════════════════════════════════════════════════════════
  //  KANAZAWA
  // ══════════════════════════════════════════════════════════════════
  { id: "kz-w1", name: "Fuente Kenroku-en", category: "water", city: "kanazawa", lat: 36.5626, lng: 136.6629, description: "Fuente en el jardín más famoso de Japón." },
  { id: "kz-w2", name: "Fuente Parque Asano", category: "water", city: "kanazawa", lat: 36.5618, lng: 136.6590, description: "Fuente junto al río Asano." },
  { id: "kz-t1", name: "Baños Kenroku-en", category: "toilet", city: "kanazawa", lat: 36.5620, lng: 136.6635, description: "Baños en el jardín." },
  { id: "kz-t2", name: "Baños Higashi Chaya", category: "toilet", city: "kanazawa", lat: 36.5650, lng: 136.6670, description: "Baños en el barrio de geishas." },
  { id: "kz-a1", name: "JP Post Kanazawa", category: "atm", city: "kanazawa", lat: 36.5613, lng: 136.6562, description: "ATM Japan Post. Acepta extranjeras." },
  { id: "kz-l1", name: "Taquillas Estación Kanazawa", category: "locker", city: "kanazawa", lat: 36.5613, lng: 136.6562, description: "Taquillas en la estación." },
  { id: "kz-wi1", name: "WiFi Kenroku-en", category: "wifi", city: "kanazawa", lat: 36.5626, lng: 136.6629, description: "WiFi gratuito en el jardín." },
  { id: "kz-k1", name: "7-Eleven Kanazawa Station", category: "konbini", city: "kanazawa", lat: 36.5610, lng: 136.6565, description: "Abierto 24h." },
  { id: "kz-tr1", name: "Papelera Kenroku-en", category: "trash", city: "kanazawa", lat: 36.5626, lng: 136.6630, description: "Contenedores clasificados en las entradas del jardín." },
  { id: "kz-ph1", name: "Farmacia Kanazawa Station", category: "pharmacy", city: "kanazawa", lat: 36.5613, lng: 136.6563, description: "Farmacia en la zona de la estación." },
  { id: "kz-ti1", name: "Oficina Turismo Kanazawa", category: "tourist_info", city: "kanazawa", lat: 36.5613, lng: 136.6562, description: "Info en la estación. Mapas del Kenroku-en." },

  // ══════════════════════════════════════════════════════════════════
  //  HAKONE
  // ══════════════════════════════════════════════════════════════════
  { id: "hk-w1", name: "Fuente Owakudani", category: "water", city: "hakone", lat: 35.2436, lng: 139.0216, description: "Fuente en el valle volcánico." },
  { id: "hk-w2", name: "Fuente Lago Ashi", category: "water", city: "hakone", lat: 35.2043, lng: 139.0216, description: "Fuente junto al lago." },
  { id: "hk-t1", name: "Baños Owakudani", category: "toilet", city: "hakone", lat: 35.2436, lng: 139.0220, description: "Baños en la estación de Owakudani." },
  { id: "hk-t2", name: "Baños Moto-Hakone", category: "toilet", city: "hakone", lat: 35.1917, lng: 139.0216, description: "Baños junto al lago." },
  { id: "hk-a1", name: "ATM Hakone-Yumoto", category: "atm", city: "hakone", lat: 35.2330, lng: 139.1067, description: "ATM en la estación Hakone-Yumoto." },
  { id: "hk-l1", name: "Taquillas Hakone-Yumoto", category: "locker", city: "hakone", lat: 35.2330, lng: 139.1067, description: "Taquillas en la estación." },
  { id: "hk-k1", name: "7-Eleven Hakone-Yumoto", category: "konbini", city: "hakone", lat: 35.2325, lng: 139.1070, description: "Abierto 24h." },
  { id: "hk-tr1", name: "Papelera Estación Hakone-Yumoto", category: "trash", city: "hakone", lat: 35.2330, lng: 139.1067, description: "Contenedores en la salida de la estación." },
  { id: "hk-ph1", name: "Farmacia Hakone-Yumoto", category: "pharmacy", city: "hakone", lat: 35.2330, lng: 139.1068, description: "Pequeña farmacia cerca de la estación." },
  { id: "hk-ti1", name: "Oficina Turismo Hakone", category: "tourist_info", city: "hakone", lat: 35.2330, lng: 139.1067, description: "Info en Hakone-Yumoto. Maps y Hakone Free Pass." },

  // ══════════════════════════════════════════════════════════════════
  //  FUKUOKA
  // ══════════════════════════════════════════════════════════════════
  { id: "fk-w1", name: "Fuente Parque Ohori", category: "water", city: "fukuoka", lat: 33.5896, lng: 130.3827, description: "Fuente junto al lago del parque." },
  { id: "fk-w2", name: "Fuente Canal City", category: "water", city: "fukuoka", lat: 33.5893, lng: 130.4104, description: "Fuente en el centro comercial." },
  { id: "fk-t1", name: "Baños Parque Ohori", category: "toilet", city: "fukuoka", lat: 33.5896, lng: 130.3830, description: "Baños junto al lago." },
  { id: "fk-t2", name: "Baños Hakata Station", category: "toilet", city: "fukuoka", lat: 33.5897, lng: 130.4206, description: "Baños en la estación principal." },
  { id: "fk-a1", name: "7-Eleven Hakata", category: "atm", city: "fukuoka", lat: 33.5897, lng: 130.4206, description: "ATM 7-Bank. Acepta extranjeras." },
  { id: "fk-a2", name: "JP Post Tenjin", category: "atm", city: "fukuoka", lat: 33.5902, lng: 130.3993, description: "ATM en oficina de correos." },
  { id: "fk-l1", name: "Taquillas Hakata Station", category: "locker", city: "fukuoka", lat: 33.5897, lng: 130.4206, description: "Taquillas ¥400-700." },
  { id: "fk-wi1", name: "WiFi Tenjin", category: "wifi", city: "fukuoka", lat: 33.5902, lng: 130.3990, description: "WiFi gratuito en zona Tenjin." },
  { id: "fk-k1", name: "Lawson Canal City", category: "konbini", city: "fukuoka", lat: 33.5890, lng: 130.4107, description: "Abierto 24h. Zona comercial." },
  { id: "fk-k2", name: "FamilyMart Tenjin", category: "konbini", city: "fukuoka", lat: 33.5900, lng: 130.3995, description: "Abierto 24h. Centro de Tenjin." },
  { id: "fk-tr1", name: "Papelera Canal City", category: "trash", city: "fukuoka", lat: 33.5893, lng: 130.4104, description: "Contenedores clasificados en el centro comercial." },
  { id: "fk-tr2", name: "Papelera Tenjin", category: "trash", city: "fukuoka", lat: 33.5902, lng: 130.3993, description: "Contenedores en la zona subterránea de compras." },
  { id: "fk-ph1", name: "Matsumoto Kiyoshi Tenjin", category: "pharmacy", city: "fukuoka", lat: 33.5902, lng: 130.3995, description: "Farmacia 24h en Tenjin." },
  { id: "fk-sm1", name: "Zona fumar Hakata Station", category: "smoking", city: "fukuoka", lat: 33.5897, lng: 130.4205, description: "Cabinas de fumar en la estación." },
  { id: "fk-ti1", name: "Oficina Turismo Fukuoka", category: "tourist_info", city: "fukuoka", lat: 33.5897, lng: 130.4206, description: "Info multilingüe en Hakata Station." },

  // ══════════════════════════════════════════════════════════════════
  //  NAGoya (NUEVA)
  // ══════════════════════════════════════════════════════════════════
  { id: "ng-w1", name: "Fuente Parque Atsuta", category: "water", city: "nagoya", lat: 35.1855, lng: 136.9064, description: "Fuente junto al Santuario Atsuta." },
  { id: "ng-w2", name: "Fuente Estación Nagoya", category: "water", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Bebedero en la salida Central." },
  { id: "ng-t1", name: "Baños Parque Tsurumai", category: "toilet", city: "nagoya", lat: 35.1650, lng: 136.8810, description: "Baños públicos en el parque principal." },
  { id: "ng-t2", name: "Baños Estación Nagoya", category: "toilet", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Baños limpios en la estación. Múltiples plantas." },
  { id: "ng-a1", name: "7-Eleven Sakae", category: "atm", city: "nagoya", lat: 35.1675, lng: 136.9085, description: "ATM 7-Bank. Abierto 24h. Zona Sakae." },
  { id: "ng-a2", name: "JP Post Nagoya", category: "atm", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "ATM Japan Post en la estación." },
  { id: "ng-l1", name: "Taquillas Estación Nagoya", category: "locker", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Taquillas ¥400-700. Salida Central." },
  { id: "ng-l2", name: "Taquillas Estación Sakae", category: "locker", city: "nagoya", lat: 35.1675, lng: 136.9085, description: "Taquillas en el metro Sakae." },
  { id: "ng-wi1", name: "WiFi Parque Tsurumai", category: "wifi", city: "nagoya", lat: 35.1650, lng: 136.8810, description: "WiFi público municipal." },
  { id: "ng-k1", name: "7-Eleven Sakae", category: "konbini", city: "nagoya", lat: 35.1675, lng: 136.9083, description: "Abierto 24h. Zona Sakae." },
  { id: "ng-k2", name: "FamilyMart Nagoya Station", category: "konbini", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Abierto 24h. Junto a la estación." },
  { id: "ng-tr1", name: "Papelera Estación Nagoya", category: "trash", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Contenedores clasificados en la salida Central." },
  { id: "ng-ph1", name: "Matsumoto Kiyoshi Sakae", category: "pharmacy", city: "nagoya", lat: 35.1675, lng: 136.9085, description: "Farmacia grande en zona Sakae." },
  { id: "ng-sm1", name: "Zona fumar Estación Nagoya", category: "smoking", city: "nagoya", lat: 35.1709, lng: 136.8812, description: "Zona designada en la estación." },
  { id: "ng-ti1", name: "Oficina Turismo Nagoya", category: "tourist_info", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Info multilingüe en la estación. Guías de la zona." },

  // ══════════════════════════════════════════════════════════════════
  //  BATTERY / CHARGE SPOT (Todas las ciudades)
  // ══════════════════════════════════════════════════════════════════

  // TOKYO
  { id: "tk-b1", name: "CHARGE SPOT Shinjuku Station", category: "battery", city: "tokyo", lat: 35.6896, lng: 139.7006, description: "Estacion CHARGE SPOT. Alquila power bank ¥150/30min. Descarga la app CHARGE SPOT." },
  { id: "tk-b2", name: "CHARGE SPOT Shibuya 109", category: "battery", city: "tokyo", lat: 35.6595, lng: 139.6985, description: "Junto a Shibuya 109. Power bank portable, devuelvelo en cualquier estacion." },
  { id: "tk-b3", name: "CHARGE SPOT Ueno Park", category: "battery", city: "tokyo", lat: 35.7148, lng: 139.7740, description: "En la entrada del Parque Ueno. Bateria de repuesto para todo el dia." },
  { id: "tk-b4", name: "CHARGE SPOT Tokyo Station", category: "battery", city: "tokyo", lat: 35.6812, lng: 139.7671, description: "Estacion en la salida Marunouchi. Ideal para recargar antes del Shinkansen." },
  { id: "tk-b5", name: "CHARGE SPOT Akihabara", category: "battery", city: "tokyo", lat: 35.6984, lng: 139.7731, description: "Zona de electronicos. Varias estaciones CHARGE SPOT en la zona." },

  // KYOTO
  { id: "ky-b1", name: "CHARGE SPOT Kyoto Station", category: "battery", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Salida Central de la estacion. Alquila antes de explorar la ciudad." },
  { id: "ky-b2", name: "CHARGE SPOT Gion", category: "battery", city: "kyoto", lat: 35.0036, lng: 135.7755, description: "En el barrio geisha. Perfecto para recargar durante el paseo nocturno." },
  { id: "ky-b3", name: "CHARGE SPOT Arashiyama", category: "battery", city: "kyoto", lat: 35.0095, lng: 135.6730, description: "Cerca del puente Togetsukyo. Bateria para fotos del Bamboo Grove." },
  { id: "ky-b4", name: "CHARGE SPOT Fushimi Inari", category: "battery", city: "kyoto", lat: 34.9671, lng: 135.7727, description: "Entrada del santuario. Recarga antes de subir los 10,000 torii." },

  // OSAKA
  { id: "os-b1", name: "CHARGE SPOT Namba Station", category: "battery", city: "osaka", lat: 34.6660, lng: 135.5016, description: "Estacion Namba. Centro de Dotonbori, zona de comida y compras." },
  { id: "os-b2", name: "CHARGE SPOT Umeda", category: "battery", city: "osaka", lat: 34.7055, lng: 135.4980, description: "Estacion Umeda. Varias estaciones en el complejo de tiendas." },
  { id: "os-b3", name: "CHARGE SPOT Dotonbori", category: "battery", city: "osaka", lat: 34.6686, lng: 135.5013, description: "Junto al canal. Alquila para fotos del letrero Glico Man." },
  { id: "os-b4", name: "CHARGE SPOT Shinsaibashi", category: "battery", city: "osaka", lat: 34.6752, lng: 135.5018, description: "Calle de compras principal. Bateria para todo el dia de shopping." },
  { id: "os-b5", name: "CHARGE SPOT Osaka Castle", category: "battery", city: "osaka", lat: 34.6873, lng: 135.5262, description: "Parque del castillo. Recarga para explorar los jardines." },

  // NARA
  { id: "na-b1", name: "CHARGE SPOT Nara Station", category: "battery", city: "nara", lat: 34.6851, lng: 135.8048, description: "Estacion principal. Alquila antes de ir al Nara Park." },
  { id: "na-b2", name: "CHARGE SPOT Kintetsu Nara", category: "battery", city: "nara", lat: 34.6824, lng: 135.8328, description: "Estacion Kintetsu. Cerca del templo Todai-ji." },
  { id: "na-b3", name: "CHARGE SPOT Nara Park", category: "battery", city: "nara", lat: 34.6851, lng: 135.8430, description: "Entrada del parque de ciervos. Bateria para todo el dia." },
  { id: "na-b4", name: "CHARGE SPOT Takakura-dori", category: "battery", city: "nara", lat: 34.6810, lng: 135.8010, description: "Calle comercial principal. Varias opciones de carga." },

  // HIROSHIMA
  { id: "hi-b1", name: "CHARGE SPOT Hiroshima Station", category: "battery", city: "hiroshima", lat: 34.3977, lng: 132.4760, description: "Estacion principal. Ideal antes de ir a Miyajima." },
  { id: "hi-b2", name: "CHARGE SPOT Peace Park", category: "battery", city: "hiroshima", lat: 34.3955, lng: 132.4536, description: "Zona memorial. Recarga para visitar el Domo de la Paz." },
  { id: "hi-b3", name: "CHARGE SPOT Hatchobori", category: "battery", city: "hiroshima", lat: 34.3940, lng: 132.4570, description: "Zona comercial cubierta. Bateria para recorrer las tiendas." },
  { id: "hi-b4", name: "CHARGE SPOT Hondori", category: "battery", city: "hiroshima", lat: 34.3920, lng: 132.4600, description: "Calle peatonal principal. Varios puntos de carga." },

  // KANAZAWA
  { id: "kn-b1", name: "CHARGE SPOT Kanazawa Station", category: "battery", city: "kanazawa", lat: 36.5780, lng: 136.6479, description: "Estacion principal. Portico Tsuzumi-mon iconico." },
  { id: "kn-b2", name: "CHARGE SPOT Kenrokuen", category: "battery", city: "kanazawa", lat: 36.5613, lng: 136.6626, description: "Junto al jardín mas famoso de Japon. Bateria para fotos." },
  { id: "kn-b3", name: "CHARGE SPOT Korinbo", category: "battery", city: "kanazawa", lat: 36.5690, lng: 136.6560, description: "Zona de oficinas y tiendas. Centro de la ciudad." },
  { id: "kn-b4", name: "CHARGE SPOT Katamachi", category: "battery", city: "kanazawa", lat: 36.5640, lng: 136.6520, description: "Zona de ocio nocturno. Recarga para la noche." },

  // NAGOYA
  { id: "ng-b1", name: "CHARGE SPOT Nagoya Station", category: "battery", city: "nagoya", lat: 35.1709, lng: 136.8815, description: "Estacion principal. Junto al Shinkansen." },
  { id: "ng-b2", name: "CHARGE SPOT Sakae", category: "battery", city: "nagoya", lat: 35.1675, lng: 136.9085, description: "Centro comercial y ocio. Varias estaciones en la zona." },
  { id: "ng-b3", name: "CHARGE SPOT Osu", category: "battery", city: "nagoya", lat: 35.1620, lng: 136.9020, description: "Barrio de compras estilo Akihabara. Electronica y manga." },
  { id: "ng-b4", name: "CHARGE SPOT Atsuta Shrine", category: "battery", city: "nagoya", lat: 35.1855, lng: 136.9064, description: "Santuario mas importante de Nagoya. Bateria para explorar." },

  // HAKONE
  { id: "hk-b1", name: "CHARGE SPOT Hakone-Yumoto", category: "battery", city: "hakone", lat: 35.2330, lng: 139.1067, description: "Estacion de entrada a Hakone. Alquila antes de subir la montana." },
  { id: "hk-b2", name: "CHARGE SPOT Gora", category: "battery", city: "hakone", lat: 35.2530, lng: 139.0230, description: "Zona de onsen y hoteles. Bateria para el dia." },
  { id: "hk-b3", name: "CHARGE SPOT Odawara Station", category: "battery", city: "hakone", lat: 35.2560, lng: 139.1600, description: "Estacion de JR. Punto de conexion con Tokyo." },
  { id: "hk-b4", name: "CHARGE SPOT Lake Ashi", category: "battery", city: "hakone", lat: 35.2040, lng: 139.0210, description: "Lago vulcanico. Fotos del santuario flotante." },

  // FUKUOKA
  { id: "fk-b1", name: "CHARGE SPOT Hakata Station", category: "battery", city: "fukuoka", lat: 33.5897, lng: 130.4206, description: "Estacion principal. Shinkansen y trenes locales." },
  { id: "fk-b2", name: "CHARGE SPOT Tenjin", category: "battery", city: "fukuoka", lat: 33.5902, lng: 130.3993, description: "Centro de Fukuoka. Zona de compras y restaurantes." },
  { id: "fk-b3", name: "CHARGE SPOT Canal City", category: "battery", city: "fukuoka", lat: 33.5893, lng: 130.4104, description: "Centro comercial. Shows de fuente y tiendas." },
  { id: "fk-b4", name: "CHARGE SPOT Nakasu", category: "battery", city: "fukuoka", lat: 33.5930, lng: 130.4080, description: "Zona de yatai (puestos de comida). Bateria para la noche." },
];
