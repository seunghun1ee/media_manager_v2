import TagList from "@/components/TagList";
import RandomItems from "@/components/RandomItems";
import TaggedItems from "@/components/TaggedItems";
import Item from "@/components/Item";

export default [
    {
        path: "/",
        component: RandomItems
    },
    {
        path: "/tags",
        component: TagList
    },
    {
        path: "/tags/:tag",
        component: TaggedItems
    },
    {
        path: "/items/:id",
        component: Item
    }
]