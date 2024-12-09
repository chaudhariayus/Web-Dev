

export function Appbar(){
    return <div className="flex justify-between px-10 border-b items-center py-3">
        <div className="font-semibold ">Medium</div>
        <Avatar name="Ayush"/>
    </div>
}

function Avatar({name}:{name:string}){
    return<div className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center text-base font-semibold"> {name[0].toUpperCase()}
    </div>
}