---
title: Datenstruktur
chapter: Datenstruktur
id: datenstruktur
---
# Verwendete Datenbank: MongoDB
MongoDB ist eine Open-Source NoSQL Datenbank. Es handelt sich um eine performance-orientierte und einfach skalierbare cross-plattform Datenbank. Im gegensatz zur SQL Datenbak ist diese Dokumentorientiert, d.h. hier werden keine Schemas und Tabellen für gespeicherte Daten verwendet, stattdessen aber Collections mit Datenbankeinträgen, die jeder als ein separates Dokument dargestellt und gespeichert werden.
Jedes Dokument besteht aus key-value Paaren und hat dynamische Schemas, d.h. Dokumente in der selben Collection haben
keine festgelegte Struktur und müssen nicht gleiche Felder und Datentypen beinhalten. Jedes Dokument in der Datenbank hat eine id (Primär Key), der automatisch beim Speichern des Eintrags generiert wird. Jedes Dokument kann beliebig viele eingebettete Dokumente beinhalten.

Vergleich RDBMS und MongoDB:

| RDBMS |   MongoDB   |
| :-------------: | :-------------: |
|   Table    |     Collection  |
|  Tuple/Row | Document |
| column | Field |  
| Table Join | Embedded Documents  |
| Primary Key | Primary Key (Default key _id provided by mongodb itself) |

# Unsere Datenstruktur

3 Collections - USER, ROOM, MEDIAFILE

Diese halten weitere Objekte innerhalb ihres Dokuments.
Dadurch können beispielsweise Mediafiles über ein Mediaobject in seinen VR-Attributen verwaltet werden (Position etc.).
Somit ist es möglich ein Mediafile in mehreren Räumen unterschiedlich zu platzieren.

## user
| fieldname | type |
| :--- | :---- |
|  id | Object ID |
| username | String |
| password | String |

## room
| fieldname | type |
| :--- | :---- |
|  id | Object ID |
| user_id | Object ID |
| roomname | String |
| walls | Array: Object wall |
| sky | Object mediafile |
| light | Obect light |
| mediaobject | Array: Object ID |

##  mediafile
| fieldname | type |
| :-- | :-- |
|  id | Object ID |
| user_id | Object ID |
| src | Object ID |
| mimetype | String |



### mediaobject
| fieldname | type |
| :--- | :---- |
| position | Object position |
| width | Double |
| height | Double |
| depth | Double |
| rotation | Object position |
| scale | Object position |
| color | String |
| visible | Boolean |
| mediafile | Object mediafile |

### wall
| fieldname | type |
| :--- | :---- |
| position | Object position |
| width | Double |
| height | Double |
| depth | Double |
| rotation | Object position |
| color | String |
| textur | Object mediafile |
| visible | Boolean |

#### position
| fieldname | type |
| :-- | :-- |
| x | Double |
| y | Double |
| z | Double |

### light
| fieldname | type |
| :--- | :--- |
| position | Object position |
| angle | Integer |
| color | String |
| intensity | Double |
| type | String |


