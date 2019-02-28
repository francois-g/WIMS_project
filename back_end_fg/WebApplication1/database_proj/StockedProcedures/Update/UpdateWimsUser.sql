CREATE PROCEDURE [dbo].[UpdateWimsUser]
	@Id int,
	@Name varchar(50),
	@LastName varchar(50),
	@NickName varchar(50),
	@Email varchar(50),
	@IsTwitcher bit,
	@ConditionAccepted bit,
	@CurrencyId int,
	@Avatar image,
	@Pswd varchar(50),
	@Role int
AS
	UPDATE WimsUser SET Name = @Name, LastName = @LastName, NickName = @NickName, Email = @Email, IsTwitcher = @IsTwitcher,
	ConditionAccepted = @ConditionAccepted, CurrencyId = @CurrencyId, Avatar =@Avatar, Pswd = @Pswd, RoleId = @Role WHERE Id = @Id;
RETURN 0
