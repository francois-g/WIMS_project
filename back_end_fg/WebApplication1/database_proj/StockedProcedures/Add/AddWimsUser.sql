CREATE PROCEDURE [dbo].[AddWimsUser]
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
	INSERT INTO WimsUser ( Name, LastName, NickName, Email, IsTwitcher, ConditionAccepted, CurrencyId, Avatar, Pswd, RoleId) 
	VALUES (@Name, @LastName, @NickName, @Email, @IsTwitcher, @ConditionAccepted, @CurrencyId, @Avatar, @Pswd, @Role);
RETURN 0
