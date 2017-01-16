---
title: Serverstruktur
chapter: Serverstruktur
id: serverstruktur
---

## Serveraufbau

Das Backend umfasst die Datenbankschemata sowie eine REST-Schnitstelle.
Der Server basiert im wesentlichen dabei auf folgenden NodeJS-Modulen.

**Express**:
 - [Express](http://expressjs.com/de/)
 - Ein Web Framework für einen simplen Webserver.

**Mongoose**:
 - [Mongoose](http://mongoosejs.com/)
 - Objekt orientiertes Arbeiten mit MongoDB.

**Multer**:
  - [Multer](https://github.com/expressjs/multer)
  - Zur Verarbeitung von FIle-Uploads.

**GridFS-Stream:**
- [GridFS-Stream](https://github.com/aheckmann/gridfs-stream)
- Erweitert GridFS um wenige Funktionalitäten. Ermöglicht das speichern von Dateien größer als 16MB in MongoDB.

## REST

### User

| Typ | Route | Beschreibung |
| :-- | :-----| :----------- |
| GET | /user | Liefert alle User |
| GET | /user/:_id | Liefert User mit übergebener ID  |
| GET | /user/name/:name | Liefert User mit übergebenen Namen |
| POST | /user | Neuen User erstellen |
| PUT | /user/:_id | Updated einen User |
| DELETE | /user/:_id | Löscht einen User |

### Room

| Typ | Route | Beschreibung |
| :----- | :--------- | :----------------------- |
| GET | /room | Liefert alle Räume |
| GET   | /room/:_id | Liefert Raum mit übergebener ID  |
| GET | /room/by_user/:user_id | Liefert Raum mittels übergebener UserID |
| POST | /room | Neuen Raum erstellen |
| PUT | /room/:_id | Updated einen Raum |
| DELETE | /room/:_id | Löscht einen Raum |

### Mediafile

| Typ | Route | Beschreibung |
| :----- | :--------- | :----------------------- |
| GET | /mediafile | Liefert alle Mediafiles |
| GET   | /mediafile/by_user/:user_id | Liefert alle MediaFiles die der übergebenen UserID gehören  |
| GET | /mediafile/:_id | Liefert ein MediaFIle mittels der ID |
| GET | /mediafile/file/:_id | Liefert das im MediaFIle hinterlegte File |
| POST | /mediafile/:user_id | Ein neues MediaFile erstellen. Benötigt eine mitgegebene UserID |
| DELETE | /mediafile/:_id | Löscht ein MediaFile |
