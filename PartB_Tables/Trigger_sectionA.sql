--1. בדיקת תקינות, אין לשנות מחיר למוצר בפער של יותר מ10 אחוז מהמחיר הקודם
-----------------------------------------------------------------------------------
--use [PartB_Table]

CREATE TRIGGER trg_Connections 
ON dbo.Person_tbl
AFTER INSERT
	AS
	BEGIN
	    INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Fathеr_Id , 'Father'
		FROM inserted i
		WHERE EXISTS (
        SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
    );
		INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Mother_Id , 'Mother'
		FROM inserted i
		WHERE EXISTS (
        SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
    );
		INSERT INTO dbo.Connection_tbl([Ρerson_Id] , Relative_Id , Connection_Type)
		SELECT [Ρerson_Id] ,Spouѕe_Id , 'spouse'
		FROM inserted i 
		WHERE EXISTS (
        SELECT 1 FROM dbo.Person_tbl person WHERE person.[Ρerson_Id] = i.[Ρerson_Id]
    );
		--PRINT 'נכנסתי לטריגר'
		--IF UPDATE(Cost) --האם נעשה שינוי בשדה המחיר
		--	BEGIN
		--		PRINT 'המחיר השתנה'
		--		DECLARE @oldPrice money
		--		DECLARE @newPrice money
		--		SELECT @oldPrice = Cost FROM deleted --המחיר לפני העדכון
		--		SELECT @newPrice = Cost FROM inserted --המחיר לאחר העדכון
		--		IF @oldPrice/100*10 < ABS(@newPrice-@oldPrice)
		--		BEGIN
		--			PRINT 'השינוי בוטל'
		--			ROLLBACK--ביטול הפעולה , גלול אחורה, אל תבצע את הפעולה שהפעילה את הטריגר
			
		--		END

	END

DROP TRIGGER trg_Connections

	
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
VALUES (2,'אסתר','ספראי', 'F',NULL , NULL,2)


UPDATE dbo.Person_tbl
SET Spouѕe_Id = 1
WHERE Ρerson_Id = 2;


INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (3,'זאב','קופלוביץ', 'M',NULL , NULL,4)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (4,'שושנה','קופלוביץ', 'F',NULL , NULL,3)

INSERT INTO dbo.Person_tbl(Ρerson_Id , [Person_Name] , Family_Name , Gender , Fathеr_Id , Mother_Id , Spouѕe_Id)
VALUES (5,'משה','ספראי', 'M',1 , 2,6)