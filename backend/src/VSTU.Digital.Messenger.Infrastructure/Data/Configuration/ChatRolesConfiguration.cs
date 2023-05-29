using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Configuration;

public class ChatRolesConfiguration : IEntityTypeConfiguration<ChatRole>
{
    public void Configure(EntityTypeBuilder<ChatRole> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Name).HasMaxLength(50).IsRequired();

        builder.HasData(
            new UserRole { Id = 1, Name = "Администратор" },
            new UserRole { Id = 2, Name = "Создатель" },
            new UserRole { Id = 3, Name = "Модератор" });
    }
}