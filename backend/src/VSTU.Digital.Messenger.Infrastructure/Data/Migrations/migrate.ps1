# run from root Infrastructure folder
# ./Data/Migrations/migrate.ps1 -Name "migration name"

param (
    [string]$Name
)

dotnet ef migrations add $Name --startup-project ../VSTU.Digital.Messenger.API -o Data/Migrations
dotnet ef database update $Name --startup-project ../VSTU.Digital.Messenger.API