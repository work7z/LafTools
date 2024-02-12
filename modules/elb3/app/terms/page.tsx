import CardPanel from "../__CORE__/components/CardPanel";
import { Dot } from "../__CORE__/utils/TranslationUtils";

export default function Page() {
    return <CardPanel className='' style={{
        flex: '1'
    }}>
        <h1 className="text-lg p-2 font-bold">{Dot("zr3ZBdUoT", "User's Guide")}</h1>
        <p className="p-2">
            {Dot("dwJucRtar", "This part is still in progress, welcome to contribute to the project for this part.")}
        </p>
    </CardPanel>
}

