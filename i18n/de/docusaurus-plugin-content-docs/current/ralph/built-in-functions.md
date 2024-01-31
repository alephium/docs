---
sidebar_position: 20
title: Built-in Funktionen
sidebar_label: Built-in Funktionen
---

<!---
This file is auto-generated with "scripts/generate-builtin-functions.js"
-->

Die integrierten Funktionen (Built-in Functions) sind in mehrere Kategorien unterteilt:
[Contract](#contract-functions),
[SubContract](#subcontract-functions),
[Asset](#asset-functions),
[Utils](#utils-functions),
[Chain](#chain-functions),
[Conversion](#conversion-functions),
[ByteVec](#bytevec-functions),
[Cryptography](#cryptography-functions).
Alle integrierten Funktionen haben das Suffix `!`.
Alle Byte-Codierungen verwenden die Byte-Reihenfolge Big Endian.

## Vertragsfunktionen
---
### createContract

```Rust
fn createContract!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Erstellt einen neuen Vertrag ohne Token-Ausgabe.

> @param **bytecode** *der Bytecode des zu erstellenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @returns *die ID des erstellten Vertrags*

---

### createContractWithToken

```Rust
fn createContractWithToken!(bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Erstellt einen neuen Vertrag mit Token-Ausgabe.

> @param **bytecode** *der Bytecode des zu erstellenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @param **issueTokenAmount** *die Menge der auszugebenden Token*
>
> @param **issueTo** *(optional) eine festgelegte Adresse, um die ausgegebenen Token zu erhalten*
>
> @returns *die ID des erstellten Vertrags*

---

### copyCreateContract

```Rust
fn copyCreateContract!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Erstellt einen neuen Vertrag ohne Token-Ausgabe durch Kopieren des Codes eines anderen Vertrags. Dies kostet weniger Gas als createContract!

> @param **contractId** *die ID des zu kopierenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @returns *die ID des erstellten Vertrags*

---

### copyCreateContractWithToken

```Rust
fn copyCreateContractWithToken!(contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Erstellt einen neuen Vertrag mit Token-Ausgabe durch Kopieren des Codes eines anderen Vertrags. Dies kostet weniger Gas als createContractWithToken!(...).

> @param **contractId** *die ID des zu kopierenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @param **issueTokenAmount** *die Menge der auszugebenden Token*
>
> @param **issueTo** *(optional) eine festgelegte Adresse zum Empfangen der ausgegebenen Token*
>
> @returns *die ID des erstellten Vertrags*

---

### selfAddress

```Rust
fn selfAddress!() -> (Address)
```

Gibt die Adresse des Vertrags zurück.

> @returns *die Adresse des Vertrags*

---

### selfContractId

```Rust
fn selfContractId!() -> (ByteVec)
```

Gibt die ID (ByteVec) des Vertrags zurück.

> @returns *die ID (ByteVec) des Vertrags*

---

### selfTokenId

```Rust
fn selfTokenId!() -> (ByteVec)
```

Gibt die Token-ID (ByteVec) des Vertrags zurück.

> @returns *die Token-ID (ByteVec) des Vertrags*

---

### tokenId

```Rust
fn tokenId!(contract:<Contract>) -> (ByteVec)
```

Gibt die ID des Vertrags zurück.

> @param **contract** *die Vertragsvariable*
>
> @returns *die ID des Vertrags*

---

### contractId

```Rust
fn contractId!(contract:<Contract>) -> (ByteVec)
```

Gibt die ID des Vertrags zurück.

> @param **contract** *die Vertragsvariable*
>
> @returns *die ID des Vertrags*

---

### callerContractId

```Rust
fn callerContractId!() -> (ByteVec)
```

Gibt die Vertrags-ID des Aufrufers zurück.

> @returns *die Vertrags-ID des Aufrufers*

---

### callerAddress

```Rust
fn callerAddress!() -> (Address)
```

Gibt die Adresse des Aufrufers zurück. Wenn es in einem TxScript verwendet wird, gibt es die eindeutige Eingangsadresse zurück, wenn die Eingangsadressen identisch sind, sonst schlägt es fehl.

> @returns *die Adresse des Aufrufers. Wenn sie in einem TxScript verwendet wird, gibt sie die eindeutige Eingangsadresse zurück, wenn die Eingangsadressen gleich sind, ansonsten schlägt sie fehl*

---

### contractInitialStateHash

```Rust
fn contractInitialStateHash!(contractId:ByteVec) -> (ByteVec)
```

Gibt den anfänglichen Zustandshash des Vertrags zurück.

> @param **contractId** *die ID des Eingangsvertrags*
>
> @returns *der Anfangszustandshash des Vertrags*

---

### contractCodeHash

```Rust
fn contractCodeHash!(contractId:ByteVec) -> (ByteVec)
```

Gibt den Vertragscodehash des Vertrags zurück.

> @param **contractId** *die ID des Eingangsvertrags*
>
> @returns *der Vertragscodehash des Vertrags*

---

### callerInitialStateHash

```Rust
fn callerInitialStateHash!() -> (ByteVec)
```

Gibt den anfänglichen Zustandshash des Aufrufervertrags zurück.

> @returns *der Anfangszustandshash des Aufrufervertrags*

---

### callerCodeHash

```Rust
fn callerCodeHash!() -> (ByteVec)
```

Gibt den Vertragscodehash des Aufrufervertrags zurück.

> @returns *der Vertragscodehash des Aufrufervertrags*

---

### contractExists

```Rust
fn contractExists!(contractId:ByteVec) -> (Bool)
```

Überprüft, ob der Vertrag mit der angegebenen ID existiert.

> @param **contractId** *die ID des zu testenden Eingangsvertrags*
>
> @returns *true, wenn der Vertrag auf der Kette existiert, andernfalls false*

---

### destroySelf

```Rust
fn destroySelf!(refundAddress:Address) -> ()
```

Zerstört den Vertrag und überträgt das verbleibende Vermögen an eine festgelegte Adresse.

> @param **refundAddress** *die Adresse, um die verbleibenden Vermögenswerte im Vertrag zu erhalten*
>
> @returns

---

### migrate

```Rust
fn migrate!(newBytecode:ByteVec) -> ()
```

Migriert den Code des Vertrags.

> @param **newBytecode** *das neue Bytecode für den Vertrag, zu dem migriert werden soll*
>
> @returns

---

### migrateWithFields

```Rust
fn migrateWithFields!(newBytecode:ByteVec, newEncodedImmFields:ByteVec, newEncodedMutFields:ByteVec) -> ()
```

Migriert sowohl den Code als auch die Felder des Vertrags.

> @param **newBytecode** *der Bytecode für den Vertrag, zu dem migriert werden soll*
>
> @param **newEncodedImmFields** *die codierten unveränderlichen Felder für den Vertrag, zu dem migriert werden soll*
>
> @param **newEncodedMutFields** *die codierten veränderlichen Felder für den Vertrag, zu dem migriert werden soll*
>
> @returns

---

### isCalledFromTxScript

```Rust
fn isCalledFromTxScript!() -> (Bool)
```

Überprüft, ob die Funktion von einem TxScript aufgerufen wird.

> @returns *true, wenn die Funktion von einem TxScript aufgerufen wird, andernfalls false*

---

### selfContract

```Rust
fn selfContract!() -> (<Contract>)
```

Gibt den eigenen Vertrag zurück.

> @returns *Selbstvertrag*

---

## SubContract Functions
---
### createSubContract

```Rust
fn createSubContract!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Erstellt einen neuen Untervertag ohne Token-Ausgabe.

> @param **subContractPath** *der Pfad des zu erstellenden Unter-Vertrags*
>
> @param **bytecode** *der Bytecode des zu erstellenden Unter-Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @returns *die ID des erstellten Vertrags*

---

### createSubContractWithToken

```Rust
fn createSubContractWithToken!(subContractPath:ByteVec, bytecode:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Erstellt einen neuen Untervertag mit Token-Ausgabe.

> @param **subContractPath** *der Pfad des zu erstellenden Unter-Vertrags*
>
> @param **bytecode** *der Bytecode des zu erstellenden Unter-Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @param **issueTokenAmount** *die Menge der auszugebenden Token*
>
> @param **issueTo** *(optional) eine festgelegte Adresse zum Empfangen der ausgegebenen Token*
>
> @returns *die ID des erstellten Vertrags*

---

### copyCreateSubContract

```Rust
fn copyCreateSubContract!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec) -> (ByteVec)
```

Erstellt einen neuen Untervertag ohne Token-Ausgabe durch Kopieren des Codes eines anderen Vertrags. Dies kostet weniger Gas als createSubContract!(...).

> @param **subContractPath** *der Pfad des zu erstellenden Unter-Vertrags*
>
> @param **contractId** *die ID des zu kopierenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @returns *die ID des erstellten Vertrags*

---

### copyCreateSubContractWithToken

```Rust
fn copyCreateSubContractWithToken!(subContractPath:ByteVec, contractId:ByteVec, encodedImmFields:ByteVec, encodedMutFields:ByteVec, issueTokenAmount:U256, issueTo?:Address) -> (ByteVec)
```

Erstellt einen neuen Untervertag mit Token-Ausgabe durch Kopieren des Codes eines anderen Vertrags. Dies kostet weniger Gas als createSubContractWithToken!(...).

> @param **subContractPath** *der Pfad des zu erstellenden Unter-Vertrags*
>
> @param **contractId** *die ID des zu kopierenden Vertrags*
>
> @param **encodedImmFields** *die codierten unveränderlichen Felder als ByteVec*
>
> @param **encodedMutFields** *die codierten veränderlichen Felder als ByteVec*
>
> @param **issueTokenAmount** *die Menge der auszugebenden Token*
>
> @param **issueTo** *(optional) eine festgelegte Adresse zum Empfangen der ausgegebenen Token*
>
> @returns *die ID des erstellten Vertrags*

---

### subContractId

```Rust
fn subContractId!(subContractPath:ByteVec) -> (ByteVec)
```

Gibt die ID des Untervertags zurück.

> @param **subContractPath** *der Pfad des Unter-Vertrags*
>
> @returns *die ID des Unter-Vertrags*

---

### subContractIdOf

```Rust
fn subContractIdOf!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Gibt die ID des Untervertags zurück.

> @param **contract** *der übergeordnete Vertrag des Unter-Vertrags*
>
> @param **subContractPath** *der Pfad des Unter-Vertrags*
>
> @returns *die ID des Unter-Vertrags*

---

### subContractIdInParentGroup

```Rust
fn subContractIdInParentGroup!(contract:<Contract>, subContractPath:ByteVec) -> (ByteVec)
```

Gibt die ID des Untervertags zurück.

> @param **contract** *der übergeordnete Vertrag des Unter-Vertrags*
>
> @param **subContractPath** *der Pfad des Unter-Vertrags*
>
> @returns *die ID des Unter-Vertrags*

---

## Asset Functions
---
### approveToken

```Rust
fn approveToken!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Genehmigt die Verwendung einer bestimmten Menge an Token von der angegebenen Adresse.

> @param **fromAddress** *der übergeordnete Vertrag des Unter-Vertrags*
>
> @param **tokenId** *das zu genehmigende Token*
>
> @param **amount** *die Menge der zu genehmigenden Token*
>
> @returns

---

### tokenRemaining

```Rust
fn tokenRemaining!(address:Address, tokenId:ByteVec) -> (U256)
```

Gibt die Menge der verbleibenden Tokenmenge in den Eingangsvermögen der Funktion zurück.

> @param **address** *die Eingangsadresse*
>
> @param **tokenId** *die Token-ID*
>
> @returns *die Menge der verbleibenden Token in den Eingangsvermögen der Funktion*

---

### transferToken

```Rust
fn transferToken!(fromAddress:Address, toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Überträgt Token aus dem Eingangsvermögen der Funktion.

> @param **fromAddress** *die Adresse, von der Token transferiert werden sollen
>
> @param **toAddress** *die Adresse, zu der Token transferiert werden sollen*
>
> @param **tokenId** *das zu transferierende Token*
>
> @param **amount** *die Menge der zu transferierenden Token*
>
> @returns

---

### transferTokenFromSelf

```Rust
fn transferTokenFromSelf!(toAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Überträgt die Token des Vertrags aus dem Eingangsvermögen der Funktion.

> @param **toAddress** *die Adresse, zu der Token transferiert werden sollen*
>
> @param **tokenId** *das zu transferierende Token*
>
> @param **amount** *die Menge der zu transferierenden Token*
>
> @returns

---

### transferTokenToSelf

```Rust
fn transferTokenToSelf!(fromAddress:Address, tokenId:ByteVec, amount:U256) -> ()
```

Überträgt Token an den Vertrag aus dem Eingangsvermögen der Funktion.

> @param **fromAddress** *die Adresse, von der Token transferiert werden sollen*
>
> @param **tokenId** *das zu transferierende Token*
>
> @param **amount** *die Menge der zu transferierenden Token*
>
> @returns

---

### burnToken

```Rust
fn burnToken!(address:Address, tokenId:ByteVec, amount:U256) -> ()
```

Verbrennt Token aus dem Eingangsvermögen der Funktion.

> @param **address** *die Adresse, von der Token verbrannt werden sollen*
>
> @param **tokenId** *das zu verbrennende Token*
>
> @param **amount** *die Menge der zu verbrennenden Token*
>
> @returns

---

### lockApprovedAssets

```Rust
fn lockApprovedAssets!(address:Address, timestamp:U256) -> ()
```

Sperrt das aktuelle genehmigte Vermögen.

> @param **address** *die Adresse, zu der die Vermögen gesperrt werden sollen*
>
> @param **timestamp** *der Zeitstempel, bis zu dem die Vermögen gesperrt werden sollen*
>
> @returns

---

## Utils Functions
---
### assert

```Rust
fn assert!(condition:Bool, errorCode:U256) -> ()
```

Testet die Bedingung oder überprüft Invarianten.

> @param **condition** *die zu überprüfende Bedingung*
>
> @param **errorCode** *der Fehlercode, der geworfen wird, wenn die Überprüfung fehlschlägt*
>
> @returns

---

### checkCaller

```Rust
fn checkCaller!(condition:Bool, errorCode:U256) -> ()
```

Überprüft Bedingungen des externen Aufrufers der Funktion.

> @param **condition** *die zu überprüfende Bedingung*
>
> @param **errorCode** *der Fehlercode, der geworfen wird, wenn die Überprüfung fehlschlägt*
>
> @returns

---

### isAssetAddress

```Rust
fn isAssetAddress!(address:Address) -> (Bool)
```

Gibt zurück, ob eine Adresse eine Vermögensadresse ist.

> @param **address** *die zu testende Eingangsadresse*
>
> @returns *true, wenn die Adresse eine Vermögensadresse ist, andernfalls false*

---

### isContractAddress

```Rust
fn isContractAddress!(address:Address) -> (Bool)
```

Gibt zurück, ob eine Adresse eine Vertragsadresse ist.

> @param **address** *die zu testende Eingangsadresse*
>
> @returns *true, wenn die Adresse eine Vertragsadresse ist, andernfalls false*

---

### zeros

```Rust
fn zeros!(n:U256) -> (ByteVec)
```

Gibt ein ByteVec von Nullen zurück.

> @param **n** *die Anzahl der Nullen*
>
> @returns *ein ByteVec aus Nullen*

---

### panic

```Rust
fn panic!(errorCode?: U256) -> (Never)
```

Beendet die Anwendung sofort.

> @param **errorCode** *(optional) der Fehlercode, der geworfen wird, wenn panic!(...) aufgerufen wird*
>
> @returns

---

### mulModN

```Rust
fn mulModN!(x:U256, y:U256, n:U256) -> (U256)
```

Berechnet x * y % n.

> @param **x** *x*
>
> @param **y** *y*
>
> @param **n** *n*
>
> @returns *berechne x * y % n*

---

### addModN

```Rust
fn addModN!(x:U256, y:U256, n:U256) -> (U256)
```

Berechnet (x + y) % n.

> @param **x** *x*
>
> @param **y** *y*
>
> @param **n** *n*
>
> @returns *berechne (x + y) % n*

---

### u256Max

```Rust
fn u256Max!() -> (U256)
```

Gibt den maximalen Wert von U256 zurück.

> @returns *der maximale Wert von U256*

---

### i256Max

```Rust
fn i256Max!() -> (I256)
```

Gibt den maximalen Wert von I256 zurück.

> @returns *der maximale Wert von I256*

---

### i256Min

```Rust
fn i256Min!() -> (I256)
```

Gibt den minimalen Wert von I256 zurück.

> @returns *der minimale Wert von I256*

---

### nullContractAddress

```Rust
fn nullContractAddress!() -> (Address)
```

Gibt die Null-Vertragsadresse mit der Vertrags-ID, die Nullen sind, zurück.

> @returns *die Null-Vertragsadresse mit der Vertrags-ID als Nullen*

---

## Chain Functions
---
### networkId

```Rust
fn networkId!() -> (ByteVec)
```

Gibt die Netzwerk-ID (ein einzelnes Byte) zurück.

> @returns *die Netzwerk-ID (ein einzelnes Byte)*

---

### blockTimeStamp

```Rust
fn blockTimeStamp!() -> (U256)
```

Gibt den Block-Zeitstempel zurück.

> @returns *der Zeitstempel des Blocks*

---

### blockTarget

```Rust
fn blockTarget!() -> (U256)
```

Gibt das Schwierigkeitsziel des Blocks zurück.

> @returns *das Schwierigkeitsziel des Blocks*

---

### txId

```Rust
fn txId!() -> (ByteVec)
```

Gibt die aktuelle Transaktions-ID zurück.

> @returns *die aktuelle Transaktions-ID*

---

### txInputAddress

```Rust
fn txInputAddress!(txInputIndex:U256) -> (Address)
```

Gibt die n-te Transaktionseingangsadresse zurück.

> @param **txInputIndex** *der Index der Transaktionseingabe*
>
> @returns *die n-te Transaktionseingangsadresse*

---

### txInputsSize

```Rust
fn txInputsSize!() -> (U256)
```

Gibt die Anzahl der Transaktionseingänge zurück.

> @returns *die Anzahl der Transaktionseingaben*

---

### txGasPrice

```Rust
fn txGasPrice!() -> (U256)
```

Gibt den aktuellen Transaktionsgaspreis zurück.

> @returns *der aktuelle Transaktions-Gaspreis*

---

### txGasAmount

```Rust
fn txGasAmount!() -> (U256)
```

Gibt die aktuelle Transaktionsgasmenge zurück.

> @returns *die aktuelle Transaktions-Gasmenge*

---

### txGasFee

```Rust
fn txGasFee!() -> (U256)
```

Gibt die aktuelle Transaktionsgebühr zurück.

> @returns *die aktuelle Transaktions-Gebühr*

---

### verifyAbsoluteLocktime

```Rust
fn verifyAbsoluteLocktime!(lockUntil:U256) -> ()
```

Überprüft, ob die absolute Verriegelungszeit vor dem Block-Zeitstempel liegt, andernfalls schlägt es fehl.

> @param **lockUntil** *der Zeitstempel, bis zu dem die Sperre gültig ist*
>
> @returns

---

### verifyRelativeLocktime

```Rust
fn verifyRelativeLocktime!(txInputIndex:U256, lockDuration:U256) -> ()
```

Überprüft, ob der Erstellungszeitstempel der Eingabe + Sperrdauer vor dem Block-Zeitstempel liegt, andernfalls schlägt es fehl.

> @param **txInputIndex** *der Index der Transaktionseingabe*
>
> @param **lockDuration** *die Dauer, für die die Eingabe gesperrt ist*
>
> @returns

---

### dustAmount

```Rust
fn dustAmount!() -> (U256)
```

Gibt den Staubbetrag einer UTXO zurück.

> @returns *der Staubbetrag eines UTXO*

---

## Conversion Functions
---
### toI256

```Rust
fn toI256!(from:U256) -> (I256)
```

Konvertiert U256 in I256.

> @param **from** *ein zu konvertierendes U256*
>
> @returns *ein I256*

---

### toU256

```Rust
fn toU256!(from:I256) -> (U256)
```

Konvertiert I256 in U256.

> @param **from** *ein zu konvertierendes I256*
>
> @returns *ein U256*

---

### toByteVec

```Rust
fn toByteVec!(from:Bool|I256|U256|Address) -> (ByteVec)
```

Konvertiert Bool/I256/U256/Adresse in ByteVec

> @param **from** *ein Bool|I256|U256|Adresse, das konvertiert werden soll*
>
> @returns *ein ByteVec*

---

### contractIdToAddress

```Rust
fn contractIdToAddress!(contractId:ByteVec) -> (Address)
```

Konvertiert die Vertrags-ID (ByteVec) in die Vertragsadresse (Adresse).

> @param **contractId** *die Eingabe-Vertrags-ID*
>
> @returns *eine Vertragsadresse*

---

### addressToContractId

```Rust
fn addressToContractId!(contractAddress:Address) -> (ByteVec)
```

Konvertiert die Vertragsadresse (Adresse) in die Vertrags-ID (ByteVec).

> @param **contractAddress** *die Eingabe-Vertragsadresse*
>
> @returns *eine Vertrags-ID*

---

### byteVecToAddress

```Rust
fn byteVecToAddress!(bytes:ByteVec) -> (Address)
```

Konvertiert ByteVec in Adresse.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine Adresse*

---

### u256To1Byte

```Rust
fn u256To1Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 1 Byte.

> @param **u256** *die Eingabe-U256*
>
> @returns *1 Byte*

---

### u256To2Byte

```Rust
fn u256To2Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 2 Big-Endian-Bytes.

> @param **u256** *die Eingabe-U256*
>
> @returns *2 Bytes*

---

### u256To4Byte

```Rust
fn u256To4Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 4 Big-Endian-Bytes

> @param **u256** *die Eingabe-U256*
>
> @returns *4 Bytes*

---

### u256To8Byte

```Rust
fn u256To8Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 8 Byte im Big-Endian-Format.

> @param **u256** *die Eingabe-U256*
>
> @returns *8 Bytes*

---

### u256To16Byte

```Rust
fn u256To16Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 16 Big-Endian-Bytes.

> @param **u256** *die Eingabe-U256*
>
> @returns *16 Bytes*

---

### u256To32Byte

```Rust
fn u256To32Byte!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in 32 Big-Endian-Bytes.

> @param **u256** *die Eingabe-U256*
>
> @returns *32 Bytes*

---

### u256ToString

```Rust
fn u256ToString!(u256:U256) -> (ByteVec)
```

Konvertiert U256 in Zeichenkette in ByteVec.

> @param **u256** *die Eingabe-U256*
>
> @returns *die in ByteVec umgewandelte Zeichenkette*

---

### i256ToString

```Rust
fn i256ToString!(i256:I256) -> (ByteVec)
```

Konvertiert I256 in Zeichenkette in ByteVec.

> @param **i256** *die Eingabe-U256*
>
> @returns *die in ByteVec umgewandelte Zeichenkette*

---

### boolToString

```Rust
fn boolToString!(bool:Bool) -> (ByteVec)
```

Konvertiert Bool in Zeichenkette in ByteVec.

> @param **bool** *die Eingabe-Bool*
>
> @returns *die in ByteVec umgewandelte Zeichenkette*

---

### u256From1Byte

```Rust
fn u256From1Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 1 Byte in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

### u256From2Byte

```Rust
fn u256From2Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 2 Big-Endian-Bytes in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

### u256From4Byte

```Rust
fn u256From4Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 4 Big-Endian-Bytes in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

### u256From8Byte

```Rust
fn u256From8Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 8 Big-Endian-Bytes in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

### u256From16Byte

```Rust
fn u256From16Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 16 Big-Endian-Bytes in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

### u256From32Byte

```Rust
fn u256From32Byte!(bytes:ByteVec) -> (U256)
```

Konvertiert 32 Big-Endian-Bytes in U256.

> @param **bytes** *die Eingabe-ByteVec*
>
> @returns *eine U256*

---

## ByteVec Functions
---
### size

```Rust
fn size!(bytes:ByteVec) -> (U256)
```

Gibt die Größe des ByteVec zurück.

> @param **bytes** *eine ByteVec*
>
> @returns *die Größe der ByteVec*

---

### byteVecSlice

```Rust
fn byteVecSlice!(bytes:ByteVec, from:U256, until:U256) -> (ByteVec)
```

Wählt ein Intervall von Bytes aus.

> @param **bytes** *eine ByteVec*
>
> @param **from** *der niedrigste Index, der von der ByteVec einbezogen werden soll*
>
> @param **until** *der niedrigste Index, der von der ByteVec ausgeschlossen werden soll*
>
> @returns *aeine ByteVec, die die Elemente ab Index oder höher enthält, bis (aber nicht einschließlich) Index, von dieser ByteVec erstreckt*

---

### encodeToByteVec

```Rust
fn encodeToByteVec!(...any) -> (ByteVec)
```

Kodiert Eingaben als Big-Endian ByteVec.

> @param **any** *eine Sequenz von Eingabewerten*
>
> @returns *eine ByteVec, die die Eingaben kodiert*

---

## Cryptography Functions
---
### blake2b

```Rust
fn blake2b!(data:ByteVec) -> (ByteVec)
```

Berechnet den Blake2b-256-Hash der Eingabe.

> @param **data** *die zu hashenden Eingabedaten*
>
> @returns *das 32-Byte-Hashergebnis*

---

### keccak256

```Rust
fn keccak256!(data:ByteVec) -> (ByteVec)
```

Berechnet den Keccak256-Hash der Eingabe.

> @param **data** *die zu hashenden Eingabedaten*
>
> @returns *das Hashergebnis*

---

### sha256

```Rust
fn sha256!(data:ByteVec) -> (ByteVec)
```

Berechnet den Sha256-Hash der Eingabe.

> @param **data** *die zu hashenden Eingabedaten*
>
> @returns *das Hashergebnis*

---

### sha3

```Rust
fn sha3!(data:ByteVec) -> (ByteVec)
```

Berechnet den Sha3-Hash der Eingabe.

> @param **data** *die zu hashenden Eingabedaten*
>
> @returns *das Hashergebnis*

---

### verifyTxSignature

```Rust
fn verifyTxSignature!(publicKey:ByteVec) -> ()
```

Überprüft die Transaktions-SecP256K1-Signatur eines öffentlichen Schlüssels. Die Signatur ist gegen die Transaktions-ID signiert.

> @param **publicKey** *der öffentliche Schlüssel (33 Bytes) des Signierenden*
>
> @returns

---

### getSegregatedSignature

```Rust
fn getSegregatedSignature!() -> (ByteVec)
```

Die segregierte Signatur der Transaktion

> @returns *die segregierte Signatur der Transaktion*

---

### verifySecP256K1

```Rust
fn verifySecP256K1!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Überprüft die SecP256K1-Signatur der Eingabe und des öffentlichen Schlüssels.

> @param **data** *die Daten (32 Bytes), die eigentlich signiert werden sollten*
>
> @param **publicKey** *der öffentliche Schlüssel (33 Bytes) des Signierenden*
>
> @param **signature** *der Signaturwert (64 Bytes)*
>
> @returns

---

### verifyED25519

```Rust
fn verifyED25519!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Überprüft die ED25519-Signatur der Eingabe und des öffentlichen Schlüssels.

> @param **data** *die Daten (32 Bytes), die eigentlich signiert werden sollten*
>
> @param **publicKey** *der öffentliche Schlüssel (32 Bytes) des Signierenden*
>
> @param **signature** *der Signaturwert (64 Bytes)*
>
> @returns

---

### verifyBIP340Schnorr

```Rust
fn verifyBIP340Schnorr!(data:ByteVec, publicKey:ByteVec, signature:ByteVec) -> ()
```

Überprüft die BIP340 Schnorr-Signatur der Eingabe und des öffentlichen Schlüssels.

> @param **data** *die Daten (32 Bytes), die eigentlich signiert werden sollten*
>
> @param **publicKey** *der öffentliche Schlüssel (32 Bytes) des Signierenden*
>
> @param **signature** *der Signaturwert (64 Bytes)*
>
> @returns

---

### ethEcRecover

```Rust
fn ethEcRecover!(data:ByteVec, signature:ByteVec) -> (ByteVec)
```

Stellt das ETH-Konto wieder her, das die Daten signiert hat.

> @param **data** *die Daten, die eigentlich signiert werden sollten*
>
> @param **signature** *der Signaturwert*
>
> @returns *das ETH-Konto, das die Daten signiert hat*

---

