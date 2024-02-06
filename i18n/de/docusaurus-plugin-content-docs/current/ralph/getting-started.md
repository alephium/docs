---
sidebar_position: 10
title: Einstieg
sidebar_label: Einstieg
---

import UntranslatedPageText from "@site/src/components/UntranslatedPageText";

<UntranslatedPageText />

## Einführung

Ralph ist die Programmiersprache für Smart Contracts auf der Alephium-Blockchain und konzentriert sich auf drei Ziele: Sicherheit, Einfachheit und Effizienz. Dieses Tutorial bietet Tipps zum Schreiben von sauberen, idiomatischen und sicheren Ralph Smart Contracts. Wir folgen den folgenden Prinzipien bei der Gestaltung von Ralph:
1. Halten Sie die DSL (Domain Specific Language) für Smart Contracts so einfach wie möglich.
2. Es sollte eine – und vorzugsweise nur eine – offensichtliche Möglichkeit geben, es zu tun.
3. Integriere bewährte Praktiken von Anfang an.

## Typen

Ralph ist eine statisch typisierte Sprache, aber dank Typinferenz müssen Sie den Typ für lokale Variablen und Konstanten nicht angeben.
Alle Typen in Ralph sind Werttypen, das heißt, Sie werden immer kopiert, wenn Sie als Funktionsargumente verwendet oder zugewiesen werden.
Derzeit unterstützt Ralph nur die folgenden Datentypen:

### Primitive Typen

#### U256

```rust
// Der Typ von a bis d ist U256.
let a = 10
let b = 10u
let c = 1_000_000_000
let d = 1e18
```

#### I256

```rust
// Der Typ von a bis d ist I256.
let a = -10
let b = 10i
let c = -1_000_000_000
let d = -1e18
```

#### Bool

```rust
// Der Typ von a und b ist Bool.
let a = false
let b = true
```

#### ByteVec

```rust
// ByteVec-Literale müssen mit # beginnen, gefolgt von einer Hex-Zeichenfolge.
let a = #00112233
// ByteVec-Konkatenation.
let b = #0011 ++ #2233 // `b` ist #00112233
// Leeres ByteVec.
let c = #
```

#### Address

```rust
// Adress-Literale müssen mit @ beginnen, gefolgt von einer gültigen Alephium-Adresse im Base58-Format.
let a = @1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH
```

### Festgrößen-Arrays

Die Syntax für Festgrößen-Arrays ist von Rust beeinflusst.

```rust
// Der Typ von a0 ist [U256; 4]
let a0 = [0, 1, 2, 3]

// Der Typ von a1 ist [[U256, 2]; 2]
let a1 = [[0, 1], [2, 3]]

// Der Typ von a2 ist [I256; 3]
let a2 = [0i; 3]

// Der Typ von a3 ist [ByteVec; 4]
let a3 = [#00, #11, #22, #33]
```

### Mapping

Ralph verwendet [subcontract](/ralph/getting-started#subcontract) anstelle einer datenbankähnlichen Datenstruktur, um eine funktionsähnliche Funktionalität bereitzustellen und das Problem des Zustandsaufblähens zu mildern.

### Struktur

Derzeit unterstützt Ralph keine benutzerdefinierten Datentypen, aber dies wird in Zukunft unterstützt werden.

## Funktionen

Funktionen sind die ausführbaren Einheiten des Codes. Sie können auch Funktionen innerhalb eines Vertrags definieren.

### Function Signatures

```rust
// Public Function, die von jedem aufgerufen werden kann.
pub fn foo() -> ()

// Private Function, die nur innerhalb des Vertrags aufgerufen werden kann.
fn foo() -> ()

// Funktion nimmt 1 Parameter entgegen und gibt keine Werte zurück.
fn foo(a: U256) -> ()

// Funktion nimmt 2 Parameter entgegen und gibt 1 Wert zurück.
fn foo(a: U256, b: Boolean) -> U256

// Funktion nimmt 2 Parameter entgegen und gibt mehrere Werte zurück.
fn foo(a: U256, b: Boolean) -> (U256, ByteVec, Address)
```

### Lokale Variablen

Eine Funktion kann keine doppelten Variablendefinitionen haben, und der Variablenname in der Funktion darf nicht mit dem Namen des Vertragsfeldes übereinstimmen.

```rust
fn foo() -> () {
  // `a` ist unveränderlich und kann nicht neu zugewiesen werden.
  let a = 10
  a = 9 // ERROR

  // `b` ist veränderlich und kann neu zugewiesen werden.
  let mut b = 10
  b = 9
}

fn bar() -> (U256, Boolean) {
  return 1, false
}

fn baz() -> () {
  // Sowohl a als auch b sind unveränderlich.
  let (a, b) = bar()
  // `c` ist unveränderlich, aber `d` ist veränderlich.
  let (c, mut d) = bar()
  // Ignoriere den ersten Rückgabewert der Funktion `bar`.
  let (_, e) = bar()
}
```

### Kontroll-Strukturen

#### Return statements

```rust
fn foo() -> (U256, Boolean, ByteVec) {
  return 1, false, #00
}
```

#### If-else statements/expressions

```rust
fn foo() -> ByteVec {
  // If-Else-Anweisung.
  if (a == 0) {
    return #00
  } else if (a == 1) {
    return #01
  } else {
    return #02
  }
}

fn foo() -> ByteVec {
  return if (a == 0) #00 else if (a == 1) #01 else #02
}
```

#### For loop

```rust
// For Schleife
fn foo() -> () {
  for (let mut index = 0; index <= 4; index = index + 1) {
    bar(index)
  }
}
```

#### While loop

```rust
// While Schleife
fn foo() -> () {
  let mut index = 0
  while (index <= 4) {
    bar(index)
    index += 1
  }
}
```

:::note
Anweisungen wie `break` und `continue` werden in `for` und `while`-Schleifen nicht unterstützt, da Sie in einigen Fällen als schlechte Praxis angesehen werden können. Es wird empfohlen, Sie durch ein vorzeitiges `return` oder eine [assert function](/ralph/built-in-functions#assert) zu ersetzen.
:::

:::note
In Ralph hat jede Funktion nur einen Geltungsbereich (Scope), sodass es nicht möglich ist, doppelte Variablen im `while` oder `for` -Block zu definieren:

```rust
let value = 0
while (true) {
  let value = 0 // ERROR, doppelte Variablendefinitionen.
  // ...
}
```
Dies ist eine bewusste Designentscheidung, da das Verdecken von Variablen im Allgemeinen keine gute Praxis ist.
:::

### Fehlerbehandlung

Ralph bietet zwei integrierte Assertionsfunktionen für die Fehlerbehandlung:  [assert!](/ralph/built-in-functions#assert) und [panic!](/ralph/built-in-functions#panic). Ein Fehler bei der Assertion führt dazu, dass alle Änderungen am Weltzustand durch die Transaktion rückgängig gemacht werden und die Ausführung der Transaktion sofort gestoppt wird.

```rust
enum ErrorCodes {
  InvalidContractState = 0
}

fn foo(cond: Boolean) -> () {
  // Es wird die Transaktion stoppen, wenn `cond` falsch ist.
  // Der Alephium-Client gibt den Fehlercode zurück, wenn die Transaktion fehlschlägt.
  assert!(cond, ErrorCodes.InvalidContractState)
}

fn bar(cond: Boolean) -> U256 {
  if (!cond) {
    // Der Unterschied zwischen `panic!` und `asset!` besteht darin, dass der Rückgabetyp von `panic!` der Bottom-Typ ist.
    panic!(ErrorCodes.InvalidContractState)
  }
  return 0
}
```

### Funktionsaufrufe

Funktionen des aktuellen Vertrags können direkt ('intern') oder rekursiv aufgerufen werden:

```rust
Contract Foo() {
  fn foo(v: U256) -> () {
    if (v == 0) {
      return
    }
    // Interner Funktionsaufruf.
    bar()
    // Rekursiver Funktionsaufruf.
    foo(v - 1)
  }

  fn bar() -> () {
    // ...
  }
}
```

Funktionen können auch extern mit der Notation `bar.func()` aufgerufen werden, wobei  `bar` eine Vertragsinstanz und `func` eine Funktion von `bar`ist:

```rust
Contract Bar() {
  pub fn func() -> U256 {
    // ...
  }
}

Contract Foo() {
  pub fn foo() -> () {
    // Instanziieren Sie den Vertrag aus der Vertrags-ID.
    let bar = Bar(#15be9537456726c336a3cd1aa36074759c457f151ac253a500085920afe3838a)
    // Externer Aufruf.
    let a = bar.func()
    // ...
  }
}
```

### Eingebaute Funktionen

Ralph bietet viele eingebaute Funktionen, auf die Sie [hier](/ralph/built-in-functions) verweisen können.

### Annotationen

Die Ralph-Funktion unterstützt auch Annotationen. Derzeit ist die einzige gültige Annotation die `@using`-Annotation, und benutzerdefinierte Annotationen werden in Zukunft unterstützt, wenn dies erforderlich ist.

Die `@using`-Annotation hat vier optionale Felder:

* `preapprovedAssets = true/false`: ob die Funktion Assets verwendet, für die der Benutzer zugestimmt hat. Der Standardwert ist `false` für Verträge und `true` für Skripte.
* `assetsInContract = true/false`: ob die Funktion Vertragsvermögen verwendet. Der Standardwert ist `false` für Verträge.
* `checkExternalCaller = true/false`: ob die Funktion den Aufrufer überprüft. Der Standardwert ist `true` für Verträge.
* `updateFields = true/false`: ob die Funktion Vertragsfelder ändert. Der Standardwert ist  `false` für Verträge.

#### Verwendung von vorab genehmigten Assets

In Ralph muss der Aufrufer, wenn eine Funktion Vermögenswerte verwendet, die Vermögenswerte ausdrücklich genehmigen. Und alle Funktionen im Aufrufstapel müssen mit `@using(preapprovedAssets = true)`.

```rust
Contract Foo() {
  // Die Funktion `foo` verwendet genehmigte Vermögenswerte und überträgt 1 ALPH und 1 Token vom `caller` an den Vertrag.
  @using(preapprovedAssets = true)
  fn foo(caller: Address, tokenId: ByteVec) -> () {
    transferAlphToSelf!(caller, 1 alph)
    transferTokenToSelf!(caller, tokenId, 1)
  }

  @using(preapprovedAssets = true)
  fn bar(caller: Address, tokenId: ByteVec) -> () {
    // Wir müssen Vermögenswerte ausdrücklich genehmigen, wenn wir die Funktion `foo` aufrufen.
    foo{caller -> 1 alph, tokenId: 1}(caller, tokenId)
    // ...
  }
}
```

Für die Annotation `preapprovedAssets` überprüft der Compiler Folgendes:

1. Wenn eine Funktion mit  `preapprovedAssets = true` annotiert ist, aber nicht die Syntax mit geschweiften Klammern verwendet, gibt der Compiler einen Fehler aus.
2. Wenn ein Funktionsaufruf die Syntax mit geschweiften Klammern verwendet, die Funktion jedoch nicht mit `preapprovedAssets = true` annotiert ist, gibt der Compiler einen Fehler aus.

#### Verwendung von Vertragsvermögen

```rust
Contract Foo() {
  // Die Funktion `foo` verwendet die Vermögenswerte des Vertrags und überträgt 1 Alph an den Aufrufer.
  @using(assetsInContract = true)
  fn foo(caller: Address) -> () {
    transferAlphFromSelf!(caler, 1 alph)
  }

  // Die Funktion `bar darf NICHT mit `@using(assetsInContract = true)` annotiert werden,
  // da die Vertragsvermögenswerte nach der Verwendung entfernt werden.
  fn bar(caller: Address) -> () {
    // ...
    foo(caller)
  }
}
```

Für die Annotation `assetsInContract` überprüft der Compiler Folgendes:

1. Wenn eine Funktion mit `assetsInContract = true` annotiert ist, aber keine Vertragsvermögen verwendet, gibt der Compiler einen Fehler aus.

Weitere Informationen zur Berechtigung für Vermögenswerte finden Sie [hier](/ralph/asset-permission-system).

#### Feldaktualisierungen

Funktionen, die Felder aktualisieren, ändern die aktuellen Felder des Vertrags. Wenn eine Funktion die Vertragsfelder ändert, aber ohne die Annotation `@using(updateFields = true)` , gibt der Compiler eine Warnung aus. Wenn eine Funktion die Vertragsfelder nicht ändert, aber mit `@using(updateFields = true)` annotiert ist, gibt der Compiler ebenfalls eine Warnung aus.

```rust
Contract Foo(a: U256, mut b: Boolean) {
  // Die Funktion `f0` ändert nicht die Felder des Vertrags.
  fn f0() -> U256 {
    return a
  }

  // Die Funktion `f1` ändert die Felder des Vertrags.
  @using(updateFields = true)
  fn f1() -> () {
    b = false
  }

  // Funktion `f2` ruft Funktion `f1` auf, selbst wenn Funktion `f1` die Felder des Vertrags ändert,
  // muss Funktion `f2` dennoch nicht mit `@using(updateFields = true)` annotiert werden,
  // weil Funktion `f2` die Vertragsfelder nicht direkt ändert.
  fn f2() -> () {
    f1()
  }
}
```

#### Check External Caller

In Smart Contracts müssen wir oft überprüfen, ob der Aufrufer der Vertragsfunktion autorisiert ist. Um Bugs durch nicht autorisierte Aufrufer zu vermeiden, gibt der Compiler Warnungen für alle öffentlichen Funktionen aus, die nicht nach externen Aufrufern überprüfen. Die Warnung kann mit der Annotation `@using(checkExternalCaller = false)` unterdrückt werden.

Der Compiler überspringt die Überprüfung für einfache Ansichtsfunktionen. Eine einfache Ansichtsfunktion muss alle folgenden Bedingungen erfüllen:

1. Sie kann die Vertragsfelder nicht ändern.
2. Sie kann keine Vermögenswerte verwenden.
3. Alle Aufrufe von Unterfunktionen müssen ebenfalls einfache Ansichtsfunktionen sein.

Um den Aufrufer einer Funktion zu überprüfen, muss die integrierte Funktion [checkCaller!](/ralph/built-in-functions#checkcaller) verwendet werden.

```rust
Contract Foo(barId: ByteVec, mut b: Boolean) {
  enum ErrorCodes {
    InvalidCaller = 0
  }

  // Wir müssen `@using(checkExternalCaller = true)` nicht hinzufügen, weil
  // `checkExternalCaller` für öffentliche Funktionen standardmäßig auf true gesetzt ist.
  pub fn f0() -> () {
    // Die integrierte Funktion `checkCaller!` wird verwendet, um zu überprüfen, ob der Aufrufer gültig ist.
    checkCaller!(callerContractId!() == barId, ErrorCodes.InvalidCaller)
    b = !b
    // ...
  }

  // Der Compiler wird Warnungen für die Funktion `f1` melden.
  pub fn f1() -> () {
    b = !b
    // ...
  }

  // Funktion `f2` ist eine einfache View-Funktion, wir müssen `using(checkExternalCaller = false)` nicht hinzufügen
  // `using(checkExternalCaller = false)` für einfache View-Funktionen.
  pub fn f2() -> ByteVec {
    return barId
  }

  // Der Compiler wird KEINE Warnungen melden, weil wir den Aufrufer in Funktion `f4` überprüft haben.
  pub fn f3() -> () {
    f4(callerContractId!())
    // ...
  }

  fn f4(callerContractId: ByteVec) -> () {
    checkCaller!(callerContractId == barId, ErrorCodes.InvalidCaller)
    // ...
  }
}
```

Es gibt noch einen anderen Fall, in dem der Compiler Warnungen ausgeben wird, wenn ein Vertrag eine Funktion über eine Schnittstelle aufruft. Das liegt daran, dass wir nicht wissen, ob die Implementierung der Funktion den externen Aufrufer überprüfen muss:

```rust
Interface Bar() {
  pub fn bar() -> ()
}

Contract Foo() {
  // Der Compiler wird Warnungen für die Funktion `Foo.foo` melden
  pub fn foo(barId: ByteVec) -> () {
    Bar(barId).bar()
  }
}
```

## Contracts (Verträge)

:::info
Jeder Alephium-Vertrag hat drei Formen der eindeutigen Identifikation:
1. **Address**: Jeder Vertrag hat eine eindeutige Adresse.
2. **Contract ID**: Jeder Vertrag hat eine eindeutige Vertrags-ID.
3. **Token ID**: Jeder Vertrag kann eine Token mit der gleichen ID wie seine eigene Vertrags-ID ausgeben.


In Ralph wird die Vertrags-ID häufiger verwendet. Vertrags-IDs können von/zu anderen Formen mit den integrierten Funktionen oder dem Web3 SDK von Ralph konvertiert werden.
:::

Verträge in Ralph ähneln Klassen in objektorientierten Sprachen. Jeder Vertrag kann Deklarationen von Vertragsfeldern, Ereignissen, Konstanten, Enums und Funktionen enthalten. Alle diese Deklarationen müssen innerhalb eines Vertrags erfolgen. Darüber hinaus können Verträge von anderen Verträgen erben.

```rust
// Dies ist ein Kommentar, und derzeit unterstützt Ralph nur Zeilenkommentare.
// Der Vertrag sollte im Upper-Camel-Case benannt werden.
// Vertragsfelder werden dauerhaft im Speicher des Vertrags gespeichert.
Contract MyToken(supply: U256, name: ByteVec) {

  // Ereignisse sollten im Upper-Camel-Case benannt werden.
  // Ereignisse ermöglichen das Protokollieren von Aktivitäten auf der Blockchain.
  // Anwendungen können diese Ereignisse über die REST-API eines Alephium-Clients abrufen.
  event Transfer(to: Address, amount: U256)

  // Konstantenvariablen sollten im Upper-Camel-Case benannt werden.
  const Version = 0

  // Enums können verwendet werden, um eine begrenzte Menge von Konstantenwerten zu erstellen.
  enum ErrorCodes {
    // Enum-Konstanten sollten im Upper-Camel-Case benannt werden.
    InvalidCaller = 0
  }

  // Funktionen, Parameter und lokale Variablen sollten im Lower-Camel-Case benannt werden.
  pub fn transferTo(toAddress: Address) -> () {
    let payloadId = #00
    // ...
  }
}
```

### Felder

Vertragsfelder werden dauerhaft im Vertragsspeicher gespeichert, und die Felder können vom Vertragscode geändert werden. Anwendungen können die Vertragsfelder über die REST-API eines Alephium-Clients abrufen.

```rust
// Der Vertrag `Foo` hat zwei Felder:
// `a`: unveränderlich, kann nicht vom Vertragscode geändert werden
// `b`: veränderlich, kann vom Vertragscode geändert werden
Contract Foo(a: U256, mut b: Boolean) {
  // ...
}

// Vertragsfelder können auch andere Verträge sein.
// Der Vertrag `Foo` wird die Vertrags-ID von `Bar` im Vertragsspeicher von `Foo` speichern.
Contract Foo(bar: Bar) {
  // ...
}

Contract Bar() {
  // ...
}
```

### Eingebaute Funktionen des Vertrags (Build-In Functions)

Manchmal müssen wir einen Vertrag innerhalb eines Vertrags erstellen, und in solchen Fällen müssen wir die Vertragsfelder in `ByteVec` codieren. Ralph bietet eine integrierte Funktion namens `encodeFields` die verwendet werden kann, um die Vertragsfelder in `ByteVec` zu codieren.

Der Parametertyp der Funktion `encodeFields` ist eine Liste der Typen der Vertragsfelder, angeordnet in der Reihenfolge ihrer Definitionen. Die Funktion gibt zwei `ByteVec`-Werte zurück, wobei der erste die codierten unveränderlichen Felder und der zweite die codierten veränderlichen Felder sind.

Hier ist ein Beispiel:

```rust
Contract Foo(a: U256, mut b: I256, c: ByteVec, mut d: Bool) {
  // functions
}

Contract Bar() {
  @using(preapprovedAssets = true)
  fn createFoo(caller: Address, fooBytecode: ByteVec, a: U256, b: I256, c: ByteVec, d: Bool) -> (ByteVec) {
    let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(a, b, c, d)
    return createContract!{caller -> 1 alph}(fooBytecode, encodedImmFields, encodedMutFields)
  }
}
```

### Ereignisse

Ereignisse sind ausgelöste Signale, die von Verträgen ausgelöst werden können. Anwendungen können diese Ereignisse über die REST-API eines Alephium-Clients abhören.

```rust
Contract Token() {
  // Die Anzahl der Ereignisfelder darf nicht größer als 8 sein.
  event Transfer(to: Address, amount: U256)

  @using(assetsInContract = true)
  pub fn transfer(to: Address) -> () {
    transferTokenFromSelf!(selfTokenId!(), to, 1)
    // Ereignis auslösen
    emit Transfer(to, 1)
  }
}
```

### SubContract (Untervertrag)

Alephiums virtuelle Maschine unterstützt Unterverträge. Unterverträge können als map-ähnliche Datenstruktur verwendet werden, sind jedoch weniger anfällig für das Problem des wachsenden Speicherplatzes. Ein Untervertrag kann von einem übergeordneten Vertrag mit einem eindeutigen Untervertragspfad erstellt werden.

```rust
Contract Bar(value: U256) {
  pub fn getValue() -> U256 {
    return value
  }
}

Contract Foo(barTemplateId: ByteVec) {
  event SubContractCreated(key: U256, contractId: ByteVec)

  @using(preapprovedAssets = true, checkExternalCaller = false)
  pub fn set(caller: Address, key: U256, value: U256) -> () {
    let path = u256To8Bytes!(key)
    let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(value) // Der Vertrag `Bar` hat nur ein Feld.
    // Erstellen Sie einen Subvertrag aus dem angegebenen Schlüssel und Wert.
    // Die Subvertrags-ID ist `blake2b(blake2b(selfContractId!() ++ path))`.
    // Es schlägt fehl, wenn der Subvertrag bereits vorhanden ist.
    let contractId = copyCreateSubContract!{caller -> 1 alph}(
      u256To8Bytes!(path),
      barTemplateId,
      encodedImmFields,
      encodedMutFields
    )
    emit SubContractCreated(key, contractId)
  }

  pub fn get(key: U256) -> U256 {
    let path = u256To8Bytes(key)
    // Holen Sie sich die `Subvertrags-ID` durch die subContractId!-Funktion.
    let contractId =  subContractId!(path)
    return Bar(contractId).getValue()
  }
}
```

### Erstellung eines Vertrags innerhalb eines Vertrags

Ralph unterstützt die programmatische Erstellung von Verträgen innerhalb von Verträgen. Ralph stellt einige integrierte Funktionen zum Erstellen von Verträgen bereit. Weitere Informationen finden Sie [hier](/ralph/built-in-functions#contract-functions).

Wenn Sie mehrere Instanzen eines Vertrags erstellen möchten, sollten Sie die integrierten Funktionen `copyCreateContract!` verwenden, was eine Menge On-Chain-Speicher und Transaktionsgasgebühren reduzieren wird.

```rust
Contract Foo(a: ByteVec, b: Address, mut c: U256) {
  // ...
}

// Wir möchten mehrere Instanzen des Vertrags `Foo erstellen.
// Zuerst müssen wir einen Vorlagenvertrag von `Foo` bereitstellen, dessen Vertrags-ID fooTemplateId ist.
// Dann können wir `copyCreateContract!` verwenden, um mehrere Instanzen zu erstellen.
TxScript CreateFoo(fooTemplateId: ByteVec, a: ByteVec, b: Address, c: U256) {
  let (encodedImmFields, encodedMutFields) = Foo.encodeFields!(a, b, c)
  copyCreateContract!(fooTemplateId, encodedImmFields, encodedMutFields)
}
```

### Migration

Alephium-Verträge können mit zwei Migrationsfunktionen aktualisiert werden: [migrate!](/ralph/built-in-functions#migrate) und [migrateWithFields!](/ralph/built-in-functions#migratewithfields). Hier sind drei typische Möglichkeiten, Sie zu verwenden:

```Rust
fn upgrade(newCode: ByteVec) -> () {
  checkOwner(...)
  migrate!(newCode)
}

fn upgrade(newCode: ByteVec, newImmFieldsEncoded: ByteVec, newMutFieldsEncoded: ByteVec) -> () {
  checkOwner(...)
  migrateWithFields!(newCode, newImmFieldsEncoded, newMutFieldsEncoded)
}

fn upgrade(newCode: ByteVec) -> () {
  checkOwner(...)
  let (newImmFieldsEncoded, newMutFieldsEncoded) = ContractName.encodeFields!(newFields...)
  migrateWithFields!(newCode, newImmFieldsEncoded, newMutFieldsEncoded)
}
```

## Vererbung

Ralph unterstützt auch mehrere Vererbungen. Wenn ein Vertrag von anderen Verträgen erbt, wird nur ein einziger Vertrag auf der Blockchain erstellt, und der Code aller übergeordneten Verträge wird in den erstellten Vertrag kompiliert.

```rust
Abstract Contract Foo(a: U256) {
  pub fn foo() -> () {
    // ...
  }
}

Abstract Contract Bar(b: ByteVec) {
  pub fn bar() -> () {
    // ...
  }
}

// Der Feldname des Kindvertrags muss mit dem Feldnamen der Elternverträge übereinstimmen.
Contract Baz(a: U256, b: ByteVec) extends Foo(a), Bar(b) {
  pub fn baz() -> () {
    foo()
    bar()
  }
}
```

:::note
In Ralph sind abstrakte Verträge nicht instanziierbar, was bedeutet, dass der folgende Code ungültig ist:

```rust
let bazId = // Die Vertrags-ID von `Baz`.
Foo(bazId).foo() // ERROR
```
:::

## Schnittstelle

Schnittstellen sind ähnlich wie abstrakte Verträge, unterliegen jedoch den folgenden Einschränkungen:

* Sie können keine implementierten Funktionen haben.
* Sie können nicht von anderen Verträgen erben, sondern können von anderen Schnittstellen erben.
* Sie können keine Vertragsfelder deklarieren.
* Verträge können nur eine Schnittstelle implementieren.

```rust
Interface Foo {
  event E(a: U256)

  @using(assetsInContract = true)
  pub fn foo() -> ()
}

Interface Bar extends Foo {
  pub fn bar() -> U256
}

Contract Baz() implements Bar {
  // Die Funktionssignatur muss mit der in der Schnittstelle deklarierten Funktionssignatur übereinstimmen.
  @using(assetsInContract = true)
  pub fn foo() -> () {
    // Erbt das Ereignis von `Foo`.
    emit E(0)
    // ...
  }

  pub fn bar() -> U256 {
    // ...
  }
}
```

Und Sie können einen Vertrag mit einer Schnittstelle instanziieren:

```rust
let bazId = // Die Vertrags-ID von `Baz`.
Foo(bazId).foo()
let _ = Bar(bazId).bar()
```

:::note
Die Bereitstellung eines Vertrags erfordert die Hinterlegung einer bestimmten Menge an ALPH im Vertrag (derzeit 1 Alph), sodass die Erstellung einer großen Anzahl von Unterverträgen nicht praktikabel ist.
:::

## TxScript

Ein Transaktionsskript ist ein Codefragment, das zur Interaktion mit Verträgen auf der Blockchain dient. Transaktionsskripte können in der Regel die Eingangsvermögen von Transaktionen nutzen. Ein Skript ist einmalig und wird nur zusammen mit der Transaktion, die es enthält, ausgeführt.

```rust
Contract Foo() {
  pub fn foo(v: U256) -> () {
    // ...
  }
}

// Das `preapprovedAssets` ist standardmäßig für `TxScript` auf true gesetzt.
// Wir setzen das `preapprovedAssets` auf false, weil das Skript keine Vermögenswerte benötigt.
@using(preapprovedAssets = false)
// `TxScript`-Felder ähneln eher Funktionsparametern, und diese
// Felder müssen jedes Mal angegeben werden, wenn das Skript ausgeführt wird.
TxScript Main(fooId: ByteVec) {
  // Der Körper von TxScript besteht aus Anweisungen.
  bar()
  Foo(fooId).foo(0)

  // Sie können auch Funktionen in `TxScript` definieren.
  fn bar() -> () {
    // ...
  }
}
```
