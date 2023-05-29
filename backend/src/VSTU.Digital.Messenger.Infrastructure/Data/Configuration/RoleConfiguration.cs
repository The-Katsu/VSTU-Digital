using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<UserRole>
{
    public void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Name).HasMaxLength(50).IsRequired();

        builder.HasData(
            new UserRole { Id = 1, Name = "Администратор" },
            new UserRole { Id = 2, Name = "Преподаватель" },
            new UserRole { Id = 3, Name = "Студент" });
    }
}