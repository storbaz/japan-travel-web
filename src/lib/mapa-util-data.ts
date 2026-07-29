export interface UtilPOI {
  id: string;
  name: string;
  category: "atm" | "charging" | "sento";
  city: string;
  lat: number;
  lng: number;
  address: string;
  hours?: string;
  fee?: string;
  notes: string;
}

export const UTIL_POIS: UtilPOI[] = [
  // === ATMs (cajeros 0% comisión) ===
  { id: "atm-7e-tokyo1", name: "7-Eleven ATM (Shinjuku)", category: "atm", city: "tokyo", lat: 35.6896, lng: 139.7006, address: "Shinjuku, Tokio", hours: "24h", notes: "7-Bank ATMs en todos los 7-Eleven. Sin comisión con tarjetas extranjeras." },
  { id: "atm-7e-tokyo2", name: "7-Eleven ATM (Shibuya)", category: "atm", city: "tokyo", lat: 35.6580, lng: 139.7016, address: "Shibuya, Tokio", hours: "24h", notes: "7-Bank. Mejor tipo de cambio para sacar yen." },
  { id: "atm-jp-tokyo", name: "Japan Post ATM (Tokyo Station)", category: "atm", city: "tokyo", lat: 35.6812, lng: 139.7671, address: "Tokyo Station, Marunouchi", hours: "6:00-23:00", notes: "Japan Post Bank. Sin comisión, acepta Visa/MC." },
  { id: "atm-7e-kyoto1", name: "7-Eleven ATM (Kyoto Station)", category: "atm", city: "kyoto", lat: 35.0116, lng: 135.7681, address: "Kyoto Station", hours: "24h", notes: "7-Bank. Justo en la salida de la estación." },
  { id: "atm-7e-osaka1", name: "7-Eleven ATM (Namba)", category: "atm", city: "osaka", lat: 34.6625, lng: 135.5023, address: "Namba, Osaka", hours: "24h", notes: "7-Bank en Namba Walk subterráneo." },
  { id: "atm-jp-nara", name: "Japan Post ATM (Nara)", category: "atm", city: "nara", lat: 34.6851, lng: 135.8049, address: "Sanjo-dori, Nara", hours: "9:00-17:00", notes: "Japan Post Bank cerca de la estación de Nara." },
  { id: "atm-7e-hiroshima", name: "7-Eleven ATM (Hiroshima)", category: "atm", city: "hiroshima", lat: 34.3853, lng: 132.4553, address: "Hondori, Hiroshima", hours: "24h", notes: "7-Bank en Hondori shopping street." },
  { id: "atm-7e-fukuoka", name: "7-Eleven ATM (Tenjin)", category: "atm", city: "fukuoka", lat: 33.5903, lng: 130.4017, address: "Tenjin, Fukuoka", hours: "24h", notes: "7-Bank. Zona comercial de Fukuoka." },
  { id: "atm-jp-kanazawa", name: "Japan Post ATM (Kanazawa)", category: "atm", city: "kanazawa", lat: 36.5613, lng: 136.6562, address: "Kanazawa Station", hours: "9:00-19:00", notes: "Japan Post Bank dentro de la estación." },
  { id: "atm-7e-hakone", name: "7-Eleven ATM (Hakone-Yumoto)", category: "atm", city: "hakone", lat: 35.2309, lng: 139.1051, address: "Hakone-Yumoto", hours: "24h", notes: "7-Bank. Único cajero fiable en Hakone." },

  // === Charging ports (puertos de carga) ===
  { id: "chrg-narita", name: "Puertos USB Narita (T1)", category: "charging", city: "tokyo", lat: 35.7647, lng: 140.3864, address: "Narita Airport T1", hours: "24h", notes: "Zonas de carga con USB y enchufe cerca de las puertas de embarque." },
  { id: "chrg-haneda", name: "Puertos USB Haneda (T3)", category: "charging", city: "tokyo", lat: 35.5494, lng: 139.7798, address: "Haneda Airport T3", hours: "24h", notes: "Estación de carga en sala de espera, junto a ventanales." },
  { id: "chrg-starbucks-shinjuku", name: "Starbucks Shinjuku (con carga)", category: "charging", city: "tokyo", lat: 35.6908, lng: 139.7001, address: "Shinjuku Southern Terrace", hours: "7:00-22:00", fee: "1 café", notes: "Mesas con enchufes. Wifi gratis." },
  { id: "chrg-starbucks-shibuya", name: "Starbucks Shibuya Tsutaya", category: "charging", city: "tokyo", lat: 35.6595, lng: 139.7004, address: "Shibuya Tsutaya 2F", hours: "7:00-23:00", fee: "1 café", notes: "Vistas al cruce de Shibuya. Enchufes en la barra." },
  { id: "chrg-tsutaya-ebisu", name: "Tsutaya Ebisu (coworking)", category: "charging", city: "tokyo", lat: 35.6471, lng: 139.7101, address: "Ebisu, Tokio", hours: "9:00-21:00", fee: "gratis", notes: "Espacio con mesas, enchufes y wifi. Comprar algo." },
  { id: "chrg-kyoto-station", name: "Kyoto Station (zona carga)", category: "charging", city: "kyoto", lat: 35.0116, lng: 135.7681, address: "Kyoto Station, 2F", hours: "6:00-23:00", notes: "Zona de descanso con enchufes al lado del Tourist Info Center." },
  { id: "chrg-kyoto-cafe", name: "Café biblioteca Kyoto", category: "charging", city: "kyoto", lat: 35.0035, lng: 135.7729, address: "Shijo-dori, Kyoto", hours: "10:00-20:00", fee: "1 café", notes: "Cafetería con mesas largas y enchufes en cada sitio." },
  { id: "chrg-osaka-station", name: "Osaka Station City (carga)", category: "charging", city: "osaka", lat: 34.7025, lng: 135.4959, address: "Osaka Station, 3F", hours: "10:00-21:00", notes: "Zona de descanso con puertos USB en el mirador gratuito." },
  { id: "chrg-namba-parks", name: "Namba Parks (carga)", category: "charging", city: "osaka", lat: 34.6623, lng: 135.5018, address: "Namba Parks, Osaka", hours: "10:00-21:00", notes: "Sofás con enchufes en la zona de descanso del rooftop garden." },
  { id: "chrg-hiroshima-station", name: "Hiroshima Station (carga)", category: "charging", city: "hiroshima", lat: 34.3964, lng: 132.4739, address: "Hiroshima Station, 1F", hours: "6:00-22:00", notes: "Enchufes cerca de las taquillas en la entrada sur." },
  { id: "chrg-manga-kissa", name: "Manga Kissa (cibercafé)", category: "charging", city: "tokyo", lat: 35.6938, lng: 139.7036, address: "Manboo!, Shinjuku", hours: "24h", fee: "~500¥", notes: "Cabina individual con enchufe, wifi y bebidas gratis. Ideal para cargar todo." },

  // === Sento (baños públicos) ===
  { id: "sento-jakotsuyu", name: "Jakotsuyu", category: "sento", city: "tokyo", lat: 35.7124, lng: 139.7952, address: "Asakusa, Tokio", hours: "6:30-18:00 (jubilados mañana)", fee: "500¥", notes: "El sento más famoso de Tokio. Agua termal real. Mural de Fuji. Tattoo-friendly." },
  { id: "sento-ren", name: "Ren Sento", category: "sento", city: "tokyo", lat: 35.6946, lng: 139.7087, address: "Shinjuku, Tokio", hours: "15:00-23:30", fee: "500¥", notes: "Moderno y limpio. Sauna incluida. Mural de azulejos tradicional." },
  { id: "sento-ooedo", name: "Ooedo Onsen Monogatari", category: "sento", city: "tokyo", lat: 35.6263, lng: 139.7768, address: "Odaiba, Tokio", hours: "11:00-9:00 (siguiente)", fee: "2,000¥", notes: "Centro termal temático. No es sento tradicional pero tiene mil baños." },
  { id: "sento-kyoto-funaoka", name: "Funaoka Onsen", category: "sento", city: "kyoto", lat: 35.0319, lng: 135.7421, address: "Kamigyo, Kyoto", hours: "15:00-1:00", fee: "430¥", notes: "El sento más antiguo de Kioto (1923). Mural de Fuji. Tattoo-friendly." },
  { id: "sento-kyoto-hana", name: "Hana no Yu", category: "sento", city: "kyoto", lat: 34.9895, lng: 135.7596, address: "Shichijo, Kyoto", hours: "6:00-23:00", fee: "800¥", notes: "Onsen urbano. Agua termal real. Jardín japonés." },
  { id: "sento-osaka-naniwa", name: "Naniwa no Yu", category: "sento", city: "osaka", lat: 34.6594, lng: 135.4963, address: "Namba, Osaka", hours: "10:00-2:00", fee: "800¥", notes: "Onsen urbano con sauna, baño burbuja y baño al aire libre." },
  { id: "sento-osaka-tennoji", name: "Tennoji Onsen", category: "sento", city: "osaka", lat: 34.6479, lng: 135.5133, address: "Tennoji, Osaka", hours: "7:00-23:00", fee: "700¥", notes: "Agua termal. Baño de burbujas y baño frío." },
  { id: "sento-nara", name: "Nara Sento", category: "sento", city: "nara", lat: 34.6827, lng: 135.8332, address: "Naramachi, Nara", hours: "15:00-22:00", fee: "450¥", notes: "Sento local tradicional. Auténtico, nada turístico." },
  { id: "sento-hiroshima", name: "Hiroshima Onsen", category: "sento", city: "hiroshima", lat: 34.3846, lng: 132.4586, address: "Nagarekawa, Hiroshima", hours: "15:00-23:00", fee: "500¥", notes: "Sento céntrico. Agua termal artificial pero bien cuidado." },
  { id: "sento-fukuoka", name: "Fukuoka Onsen Tenjin", category: "sento", city: "fukuoka", lat: 33.5893, lng: 130.3982, address: "Tenjin, Fukuoka", hours: "15:00-23:30", fee: "500¥", notes: "Sento en pleno centro. Sauna incluida." },
  { id: "sento-hakone-yumoto", name: "Hakone Yumoto Onsen", category: "sento", city: "hakone", lat: 35.2332, lng: 139.1027, address: "Hakone-Yumoto", hours: "10:00-20:00", fee: "1,000¥", notes: "Baño público junto al río. Agua termal real de Hakone." },
  { id: "sento-kanazawa", name: "Kanazawa Onsen", category: "sento", city: "kanazawa", lat: 36.5650, lng: 136.6569, address: "Katamachi, Kanazawa", hours: "15:00-23:00", fee: "450¥", notes: "Sento tradicional en el barrio de entretenimiento." },
];
