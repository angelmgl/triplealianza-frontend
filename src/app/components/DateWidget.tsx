import { FiCalendar } from "react-icons/fi";
import { formatDate } from "../helpers/date";

interface Props {
    date: string;
}

export default function DateWidget(props: Props) {
    return (
        <div className="mt-4 z-10 flex gap-2">
            <FiCalendar className="text-lg translate-y-[3px]" />
            <p>{formatDate(props.date)}</p>
        </div>
    );
}
