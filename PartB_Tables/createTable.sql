USE PartB_Table

CREATE TABLE Person_tbl
(
	Ρerson_Id int primary key,
	Person_Name  varchar(10),
	Family_Name  varchar(20),
	Gender  varchar(10),
	Fathеr_Id  int,
	Mother_Id  int,
	Spouѕe_Id int
	
	--PRIMARY KEY(EmpID)
)
GO


CREATE TABLE Connection_tbl
(
	Ρerson_Id int,
	Relative_Id  int ,
	Connection_Type varchar(20),
	FOREIGN KEY (Ρerson_Id) REFERENCES dbo.Person_tbl(Ρerson_Id)

)
GO


DROP TABLE Connection_tbl

