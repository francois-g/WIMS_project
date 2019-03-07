CREATE PROCEDURE [dbo].[UpdateWimsUser]
	@Id int,
	@FirstName varchar(50),
	@LastName varchar(50),
	@Pseudo varchar(50),
	@Pswd varchar(50),
	@Email varchar(50),
	@TwitchLink varchar(200) = null,
  @PseudoTwitch varchar(50) = null,
  @Balance int,
	@ConditionAccepted bit,
	@CurrencyId int = 1,
	@Avatar varchar(250) = null,
  @Active bit,
	@Role int

AS
	UPDATE WimsUser SET FirstName = @FirstName, LastName = @LastName, Pseudo = @Pseudo, Pswd = @Pswd, Email = @Email,
  TwitchLink = @TwitchLink, PseudoTwitch = @PseudoTwitch, Balance = @Balance, ConditionAccepted = @ConditionAccepted, CurrencyId = @CurrencyId,
  Avatar = @Avatar, Active = @Active, RoleId = @Role WHERE Id = @Id;
RETURN 0
