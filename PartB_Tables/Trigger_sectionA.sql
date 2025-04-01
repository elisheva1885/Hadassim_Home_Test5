--1. ����� ������, ��� ����� ���� ����� ���� �� ���� �10 ���� ������ �����
-----------------------------------------------------------------------------------
--use [PartB_Table]
USE PartB_Table



CREATE TRIGGER trg_connections ON dbo.Person_tbl
AFTER INSERT,UPDATE
	AS
	BEGIN
		PRINT '������ ������'
		IF UPDATE(Cost) --��� ���� ����� ���� �����
			BEGIN
				PRINT '����� �����'
				DECLARE @oldPrice money
				DECLARE @newPrice money
				SELECT @oldPrice = Cost FROM deleted --����� ���� ������
				SELECT @newPrice = Cost FROM inserted --����� ���� ������
				IF @oldPrice/100*10 < ABS(@newPrice-@oldPrice)
				BEGIN
					PRINT '������ ����'
					ROLLBACK--����� ������ , ���� �����, �� ���� �� ������ ������� �� ������
			
				END
			END
	END

	select* from dbo.Person_tbl