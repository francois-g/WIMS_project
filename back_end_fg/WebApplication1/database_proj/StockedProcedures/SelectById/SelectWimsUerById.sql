CREATE PROCEDURE [dbo].[SelectWimsUerById]
	@Id int
AS
	SELECT * FROM WimsUser WHERE Id = @Id;
RETURN 0
