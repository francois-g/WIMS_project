Set Identity_Insert Currency On;

INSERT INTO Currency (Id, CurrencyName, ConversionRate, CurrencyShortCut) VALUES
(1, 'EUR',  1.00, '€'),
(2, 'USD', 0.89, '$'),
(3, 'GBP', 1.14, '£');

Set Identity_Insert Currency Off;

Set Identity_Insert Role On;

INSERT INTO Role (Id, RoleName) VALUES
(1, 'Viewer'),
(2, 'Streamer');

Set Identity_Insert Role Off;

