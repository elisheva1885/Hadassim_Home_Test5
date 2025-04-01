--1. בדיקת תקינות, אין לשנות מחיר למוצר בפער של יותר מ10 אחוז מהמחיר הקודם
-----------------------------------------------------------------------------------
--use [PartB_Table]
USE PartB_Table



CREATE TRIGGER trg_connections ON dbo.Person_tbl
AFTER INSERT,UPDATE
	AS
	BEGIN
		PRINT 'נכנסתי לטריגר'
		IF UPDATE(Cost) --האם נעשה שינוי בשדה המחיר
			BEGIN
				PRINT 'המחיר השתנה'
				DECLARE @oldPrice money
				DECLARE @newPrice money
				SELECT @oldPrice = Cost FROM deleted --המחיר לפני העדכון
				SELECT @newPrice = Cost FROM inserted --המחיר לאחר העדכון
				IF @oldPrice/100*10 < ABS(@newPrice-@oldPrice)
				BEGIN
					PRINT 'השינוי בוטל'
					ROLLBACK--ביטול הפעולה , גלול אחורה, אל תבצע את הפעולה שהפעילה את הטריגר
			
				END
			END
	END

	select* from dbo.Person_tbl