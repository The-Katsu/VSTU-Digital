using HtmlAgilityPack;
using VSTU.Digital.Timetable.Application.Services.Interfaces;

namespace VSTU.Digital.Timetable.Application.Services.Implementations;

public class HtmlParser : IHtmlParser
{
    public string GetTimetableUrl()
    {
        var baseUrl = "https://www.vstu.ru";
        var timetablesLink = "/student/raspisaniya/";
        var web = new HtmlWeb();
        var doc = web.Load(baseUrl + timetablesLink);

        var content = doc.DocumentNode.SelectSingleNode("//div[@class='units-row content']");
        var uls = content.ChildNodes.Where(n => n.Name == "ul").ToList();
        var lis = uls[1].ChildNodes.Where(n => n.Name == "li").ToList();
        var timetableLink = lis[0].FirstChild.Attributes["href"].Value;

        return baseUrl + timetableLink;
    }
}