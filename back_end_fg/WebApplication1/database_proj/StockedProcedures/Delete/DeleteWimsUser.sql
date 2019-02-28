CREATE PROCEDURE [dbo].[DeleteWimsUser]
	@Id int
AS
	DELETE FROM WimsUser WHERE Id = @Id;
RETURN 0
