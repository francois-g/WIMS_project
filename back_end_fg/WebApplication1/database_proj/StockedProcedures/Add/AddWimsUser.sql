CREATE PROCEDURE [dbo].[AddWimsUser]
	@FirstName varchar(50),
	@LastName varchar(50),
	@Pseudo varchar(50),
	@Pswd varchar(50),
	@Email varchar(50),
	@TwitchLink varchar(200) = null,
  @PseudoTwitch varchar(50) = null,
  @Balance int = 0,
	@ConditionAccepted bit,
	@CurrencyId int = 1,
	@Avatar varchar(250) = null,
  @Active bit,
	@Role int





AS
	INSERT INTO WimsUser (FirstName, LastName, Pseudo, Pswd, Email, TwitchLink, PseudoTwitch, Balance, ConditionAccepted, CurrencyId,
  Avatar, Active, RoleId) 
	VALUES (@FirstName, @LastName, @Pseudo, @Pswd, @Email, @TwitchLink, @PseudoTwitch, @Balance, @ConditionAccepted, @CurrencyId,
  @Avatar, @Active, @Role);
RETURN 0
