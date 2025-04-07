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

	