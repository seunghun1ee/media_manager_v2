export default function (front) {
    let sortField;
    let direction;
    switch (front) {
        case "favouriteOldest":
            sortField = "favouriteDate";
            direction = 1;
            break;
        case "favouriteLatest":
            sortField = "favouriteDate";
            direction = -1;
            break;
        case "score":
            sortField = "score";
            direction = -1;
            break;
        case "oldest":
            sortField = "uploadDate";
            direction = 1;
            break;
        case "latest":
        default:
            sortField = "uploadDate";
            direction = -1;
            break;
    }
    return {sortField, direction};
}