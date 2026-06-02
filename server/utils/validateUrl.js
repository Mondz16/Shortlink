
export default function IsValidURL(url){
    return url.search("http") == 0 || url.search("https") == 0;
}