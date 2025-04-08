select* from dbo.Person_tbl
		select* from dbo.Connection_tbl


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (1,'אריה','ספראי', 'M',NULL , NULL,2)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (2,'אסתר','ספראי', 'F',NULL , NULL,1)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (3,'זאב','קופלוביץ', 'M',NULL , NULL,4)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (4,'שושנה','קופלוביץ', 'F',NULL , NULL,3)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (5,'משה','ספראי', 'M',1 , 2,6)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (6,'שרה','ספראי', 'F',3 , 4,NULL)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (7,'יחיאל','ספראי', 'M',5 , 6,8)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (8,'יוכבד','אייכנטל', 'M',NULL , NULL,NULL)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (9,'אהרון','ספראי', 'M',5 , 6,10)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (11,'פנינה','ספראי', 'M',5 , 6,NULL)

UPDATE dbo.Person_tbl
SET Gender = 'F'
WHERE Ρerson_Id = 8
UPDATE dbo.Person_tbl
SET Gender = 'F'
WHERE Ρerson_Id = 11

UPDATE dbo.Person_tbl
SET Mother_Id = 2
WHERE Ρerson_Id = 6


