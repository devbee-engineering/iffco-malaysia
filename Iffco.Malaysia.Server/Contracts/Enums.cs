using System.ComponentModel;

namespace Iffco.Malaysia.Server.Enums
{
  public enum FileUploadStatusValue
    {
        [Description("Pending")]
        Pending,
        [Description("Completed")]
        Completed,
        [Description("Failed")]
        Failed
     }
}
