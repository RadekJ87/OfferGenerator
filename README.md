<div position="center">
<img src="./public/assets/images/readme_logo.png">
</div>

# OfferGenerator

## Wstęp - opis i idea powstania

Cześć! Chciałbym przedstawić Ci bardzo prostą aplikację, która zrodziła się z faktycznej potrzeby.
Otóż w od kilku lat pracuję na stanowisku menadżera projektu w bardzo fajnej, składającej się z młodych osób i dynamicznie rozwijającej się firmie.  
Działamy w branży obróbki stali, a dokładnie rzecz nazywając produkujemy komponenty z blach stalowych, rur oraz profili. Jako menadżer niemal codziennie wysyłam oferty handlowe do naszych klientów, jak i firm zainteresowanych współpracą. Niestety, nasz system do zarządzania produkcją generuję na chwilę obecną mało estetyczne pliki arkuszy kalkulacyjnych, wyglądają wręcz archaicznie. Klient kupuję oczami, to prawdą z która każdy z Nas zmierzył się niejednokrotnie w życiu. Stąd chciałem, aby oferty które będę wysyłał do klientów były równie wysokiej jakości jak nasze wyroby. Jeżeli pracujesz w podobnej branży po delikatnej modyfikacji programu możesz również robić również to Ty! Opis gdzie trzeba dokonać zmian w kodzie umieszczę na końcu ✌

## Demo

link do filmu

## Technologia

<div>
  <p>Express.js <img height="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express" style="max-width: 100%;"></p>
    <p>HandleBars <img height="50" src="https://camo.githubusercontent.com/c8f22262462905fc485e5e533a4a520c699828f5fd7329f04dee1dc4d6403de4/68747470733a2f2f68616e646c65626172736a732e636f6d2f696d616765732f68616e646c65626172735f6c6f676f2e706e67" alt="Handlebars" title="Handlebars" data-canonical-src="https://handlebarsjs.com/images/handlebars_logo.png" style="max-width: 100%;"></p>


## Dodatkowe paczki



##  Opis działania

Aplikacja jest bardzo prosta, bo generuję dość prosty dokument.
Po uruchomieniu wyświetla się główne okno aplikacji, w którym wyświetlają się utworzone oferty, które możemy następnie:
- przeglądać, poprzez nacisnięcie odnośnika 'Szczegóły' i dalej drukować, jeżeli uznamy, że mamy już wprowadzone wszystko co oferta powinna zawierać.
- modyfikować, możemy dodawać i usuwać produkty.
- usuwać oferty z listy.
- dodawać kolejne.

## Najważniejsze wymagania jakie musiała spełniać aplikacja

#### Tworzenie ofert
- każda oferta musi posidać unikalny numer, składający się na chwilę obecną z conajmniej 7 cyfr.
- ważność oferty od daty utworzenia to 30 dni kalendarzowych, jeżeli w tym czasie klient złoży zamówienie pozycja trafia do cennika, gdzie cena jest ważna dopóki nie nastąpi jej rekalkulacja np. w wyniku znacznego skoku cen stali.
- pola adresu klienta muszą być wypełnione

#### Edycja ofert
- każdy produkt dodany do oferty musi posiadać:
> -opis,
> -ilość (MOQ - en. Minimum Order Quantity, czyli minmalna ilość zakupu, można podać kilka progów dla konkretnego produktu tworząc w ofercie progi cenowe np. dla 1/5/10 sztuk.)
> -cenę,
- nie musi posiadać komentarza, pole to jest dla menadżera, gdzie może on dodać krótka notatkę.

#### Szablon oferty
- logo firmowe w lewym górnym rogu, prawy górny róg adres firmy,
- poniżej ma znajdować się numer oferty, z prawej data utrzworzenia z datą ważności i terminem realizacji zamówienia,
- linia niżej to kolejno od lewej adres firmy i adres klienta,
- lista ofert,
- dodatkowe informacje dla klienta.


#### Instalacja 

#### Uruchamianie
