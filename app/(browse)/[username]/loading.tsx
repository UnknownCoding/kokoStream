import { StreamPlayerSkeleton } from "@/app/(dashboard)/u/[username]/_components/StreamPlayer";

const UserLoading = () => {
    return ( 
        <div className="h-full">
            <StreamPlayerSkeleton/>
        </div>
    );
};

export default UserLoading;