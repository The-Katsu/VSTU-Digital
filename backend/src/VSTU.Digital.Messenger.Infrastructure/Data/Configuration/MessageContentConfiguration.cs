using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VSTU.Digital.Messenger.Domain.Entities;

namespace VSTU.Digital.Messenger.Infrastructure.Data.Configuration;

public class MessageContentConfiguration : IEntityTypeConfiguration<MessageContent>
{
    public void Configure(EntityTypeBuilder<MessageContent> builder)
    {
        builder.HasKey(mc => mc.Id);
        builder.Property(mc => mc.ContentType).IsRequired().HasMaxLength(50);
        builder.Property(mc => mc.ContentUrl).IsRequired().HasMaxLength(250);
    }
}