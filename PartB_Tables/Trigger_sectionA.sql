--1. בדיקת תקינות, אין לשנות מחיר למוצר בפער של יותר מ10 אחוז מהמחיר הקודם
-----------------------------------------------------------------------------------
--use [PartB_Table]

CREATE TRIGGER trg_Connections 
ON dbo.Person_tbl
AFTER INSERT
	AS
	BEGIN
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT Fathеr_Id ,[Ρerson_Id] , 'Father'
		FROM inserted i
		WHERE i.Fathеr_Id IS NOT NULL;

		--WHERE EXISTS (
  --      SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
  --  );
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT Mother_Id ,[Ρerson_Id] , 'Mother'
		FROM inserted i
		WHERE i.Mother_Id IS NOT NULL;
		--WHERE EXISTS (
  --      SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
  --  );
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Spouѕe_Id , 'spouse'
		FROM inserted i
		WHERE i.Spouѕe_Id IS NOT NULL;
		
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT i.[Ρerson_Id] ,  p.[Ρerson_Id], 'spouse'
		FROM inserted i JOIN dbo.Person_tbl p
			ON p.Spouѕe_Id = i.[Ρerson_Id] 
			WHERE i.Spouѕe_Id IS NULL


		--WHERE EXISTS (
  --      SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
  --  );
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Fathеr_Id ,
		CASE 
		WHEN Gender = 'M' THEN 'son'
		WHEN Gender = 'F' THEN 'daughter'
		END
		FROM inserted i 
		WHERE i.Fathеr_Id IS NOT NULL;

		--WHERE EXISTS (
  --      SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
  --  );
	INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Mother_Id ,
		CASE 
		WHEN Gender = 'M' THEN 'son'
		WHEN Gender = 'F' THEN 'daughter'
		END
		FROM inserted i 
		WHERE i.Mother_Id IS NOT NULL;

		--WHERE EXISTS (
  --      SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
  --  );
		
		INSERT INTO dbo.Connection_tbl ([Ρerson_Id], Relative_Id, Connection_Type)
		SELECT 
			i.[Ρerson_Id],p.[Ρerson_Id],
					CASE
					WHEN  i.Gender = p.Gender and  i.Gender  = 'M' THEN 'brother'
					WHEN i.Gender = p.Gender and  i.Gender  = 'F' THEN 'sister'
					WHEN i.Gender = 'M' and  p.Gender  = 'F' THEN 'brother'
					WHEN i.Gender = 'F' and  p.Gender  = 'M' THEN 'sister'
					END
		FROM inserted i
		JOIN dbo.Person_tbl p
			ON (p.Fathеr_Id = i.[Fathеr_Id] OR p.Mother_Id = i.[Mother_Id]) and p.Ρerson_Id != i.Ρerson_Id
		WHERE NOT EXISTS (
			SELECT 1
			FROM dbo.Connection_tbl c
			WHERE 
				c.[Ρerson_Id] = i.[Ρerson_Id] AND
				c.[Relative_Id] = p.[Ρerson_Id]
)
	END

DROP TRIGGER trg_Connections
DROP TABLE Person_tbl
DROP TABLE Connection_tbl

	
--CREATE TRIGGER trg_connections1
--AFTER INSERT OR UPDATE ON dbo.Person_tbl
--FOR EACH ROW
--BEGIN
--    INSERT INTO dbo.coConnection_tbl('Person_Id' , 'Relative_Id' , 'Connection_Type')
--END;

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


