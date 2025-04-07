select* from dbo.Person_tbl
		select* from dbo.Connection_tbl


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (1,'אריה','ספראי', 'M',NULL , NULL,2)


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (2,'אסתר','ספראי', 'F',NULL , NULL,1)


UPDATE dbo.Person_tbl
SET Spouѕe_Id = 1
WHERE Ρerson_Id = 2;


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


