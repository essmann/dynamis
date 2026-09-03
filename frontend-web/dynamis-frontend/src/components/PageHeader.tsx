type PageHeaderProps = {
    title: string;
    onBack: () => void;
    onCreate?: (el: any) => void;
};
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

export default function PageHeader({ title, onBack, onCreate }: PageHeaderProps) {
    return (
        <div className="page-header flex *:text-text w-full mt-2 items-center">
            <button className='flex justify-center  ml-1 hover:bg-red-500' onClick={onBack}><ArrowBackIcon /></button>
            <div className='flex w-full justify-center  '>
                <div className=''>{title}</div>
            </div>
            {onCreate != null && <div className="mt-1 mr-1 flex" onClick={onCreate}> <AddIcon /></div>}
        </div>
    )
}