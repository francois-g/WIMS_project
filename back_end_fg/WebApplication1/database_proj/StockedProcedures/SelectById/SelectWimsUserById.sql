CREATE PROCEDURE [dbo].[SelectWimsUserById]
	@Id int
AS
	SELECT * FROM WimsUser WHERE Id = @Id;
RETURN 0
