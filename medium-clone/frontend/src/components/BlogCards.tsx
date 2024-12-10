import { Link } from "react-router-dom";

export interface Blogcardprops {
    authorname: string;
    publishedDate: string;
    title: string;
    content: string;
    id:number
}

export function BlogCards({ authorname, publishedDate, title, content ,id}: Blogcardprops) {
    return (
        <Link to={`/blog/${id}`} className="w-full max-w-2xl">
            <div className="flex flex-col w-full border-b-2 p-4 cursor-pointer">
                <div className="flex items-center">
                    <Avatar name={authorname} />
                    <div className="pl-2 flex justify-center items-center font-base text-lg">{authorname}</div>
                    <div className="h-1 w-1 rounded-full bg-slate-400 ml-2 mt-1"></div>
                    <div className="pl-2 flex justify-center items-center font-thin text-sm text-slate-500">{publishedDate}</div>
                </div>
                <div className="pt-2">
                    <div className="font-extrabold text-xl">{title}</div>
                    <div className="pt-2 font-base text-lg min-h-[3rem]">
                        {content.slice(0, 100) + "..."}
                    </div>
                </div>
                <div className="pt-4 text-slate-400">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}

export function Avatar({ name }: { name: string }) {
    return (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex justify-center items-center text-base">
            {name[0].toUpperCase()}
        </div>
    );
}
