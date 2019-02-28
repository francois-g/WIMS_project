CREATE PROCEDURE [dbo].[UpdateWimsUser]
	@Id int,
	@FirstName varchar(50),
	@LastName varchar(50),
	@Pseudo varchar(50),
	@Pswd varchar(50),
	@Email varchar(50),
	@TwitchLink varchar(200),
  @PseudoTwitch varchar(50),
	@ConditionAccepted bit,
	@CurrencyId int,
	@Avatar varchar(250),
  @Active bit,
	@Role int

AS
	UPDATE WimsUser SET FirstName = @FirstName, LastName = @LastName, Pseudo = @Pseudo, Pswd = @Pswd, Email = @Email,
  TwitchLink = @TwitchLink, PseudoTwitch = @PseudoTwitch, ConditionAccepted = @ConditionAccepted, CurrencyId = @CurrencyId,
  Avatar = @Avatar, RoleId = @Role WHERE Id = @Id;
RETURN 0
