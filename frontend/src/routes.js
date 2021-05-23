import TagList from "@/components/TagList";
import ItemList from "@/components/ItemList";

export default [
    {
        path: "/",
        component: ItemList
    },
    {
        path: "/tags",
        component: TagList
    },
    {
        path: "/tags/:tag",
        component: ItemList
    }
]