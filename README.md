## Komentarai
Užduotis buvo tikrai ne pati lengviausia. Stengiausi dirbti su Jquery, nes kiek pamenu, tai Jūs dar neperėjot ant Vue. 
Su **Vue** būčiau greičiau susisukęs, nes reikėjo nemažai prisiminti kaip ir ką daryti. Bet manau, kad pateikiau tiek kodo,kad būtų galima
susidaryti bendrą vaizdą apie žinias.

Šį projektą rašiau taip, kaip esu pratęs dirbti ir naudojau praktikas su kuriomis dirbu nuolatos.


Darbai kurių neatlikau dėl laiko stokos:
- **Napadariau devic'o naudotojų formos. End point sukūriau, kad matytusi kokia logika vadovaučiausi, jei forma veiktu ir siųstų užklausas į back'ą.**
- **Admin device lentoje sortinimas nėra user friendly. Tisiog funkcionalumas ir tiek**
- **Nežinau ar čia Google Maps blogai tvarkosi su mano paduotais duomenimis ar tiesiog reikalinga optimizacija, bet labai atsizoominus - maps pradeda laginti.**
- **Kadangi naudojau cluster'ius, tai ne visada eina pamatyti toliausiai atitolusius vienas nuo kito device. Bet kokia logika vadovavausi irgi galima pamatyti iš kodo.**

## Techniniai aprašymai
- Kadangi reikialingas **SPA**, tai apasirašiau mini routeri **resources/js/router.js**
- Custom aprašyti wrapper'iai:
  - resources/js/Utilities/Form.js - formos duomenims apdoroti
  - resources/js/Utilities/Gmap.js - dirbti su google maps
  - resources/js/Utilities/Table.js - apdoroto duomenų lentas
  - resources/js/Utilities/Device.js - kaip atskiras komponentas kurio reikėjo dirbant su map'u.
- Panaudojau Middleware, Policy, FormRequest, ModelResource, Service.


## Instrukcija
Ar tikrai reikia patalpinti į **VPS**? Gal turite galimybe pasileisti local?
Aš padariau komandą kuri paleidžia projektą local ir paleidžia visus seed.

Komanda projekto paleidimui: **php artisan app:init**
