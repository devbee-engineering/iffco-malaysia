namespace Iffco.Malaysia.Server.Contracts.Response
{
    public class GetAllFilesResponse
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public DateTime UploadDate { get; set; }
        public string UploadedBy { get; set; }
        public string Status { get; set; }
    }
}
