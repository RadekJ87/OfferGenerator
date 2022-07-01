# OfferGenerator


Cześć Kuba! Chciałbym przedstawić Ci bardzo prostą aplikację, która zrodziła się z mojej faktycznej potrzeby.
Otóż w od kliku lat pracuję na stanowisku menadżera projektu w bardzo fajnej, składającej się z młodych  osób i dynamicznie rozwijającej się firmie Kordas ( tak😊 mam zgodę zarządu na wykorzystanie nazwy firmy oraz logo na potrzeby kursu MegaK, aby aplikacja wyglądała tak jak została stworzona ).  
Działamy w branży obróbki stali, a dokładnie rzecz nazywająć produkujemy komponenty z blach stalowych, rur oraz profili. Jako menadżer niemal codziennie wysyłam oferty handlowe do naszych klientów, jak i firm zainteresowanych współpracą. Niestety, nasz system do zarządzania produkcją generuję na chwilę obecną mało estetyczne pliki arkuszy kalkulacyjch, wyglądają wręcz archaicznie. Klient kupuję oczami, to prawdą z która każdy z Nas zmierzył się niejednokrotnie w życiu. Stąd chciałem, aby oferty które będę wysłał do klientów wyglądały estetycznie i nowocześnie. Oto rezultat!


## Technologia

Express.js + HandleBars

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
- nie musi posiadać komentarza, pole to jest dla menadzera, gdzie może on dodać krótka notatkę.

#### Szablon oferty
- logo firmowe w lewym górnym rogu, prawy górny róg adres firmy,
- poniżej ma znajdować się numer oferty, z prawej data utrzworzenia z datą ważności i terminem realizacji zamówienia,
- linia niżej to kolejno od lewej adres firmy i adres klienta,
- lista ofert,
- dodatkowe informacje dla klienta.

# Dziękuje i pozdrawiam!