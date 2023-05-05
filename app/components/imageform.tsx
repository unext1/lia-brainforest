import { type WPschema } from '~/types';

export const ImageComponent = ({
    navigation,
    tags,
    data,
    description,
}: {
    navigation: any;
    tags: string | string[];
    data: WPschema;
    description: string;
}) => {
    return (
        <>
            <div className='grid gap-5 2xl:grid-cols-2'>
                <div className='flex flex-col'>
                    <label
                        htmlFor='title'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Wordpress title
                    </label>
                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='title'
                        placeholder='No title yet..'
                        defaultValue={data?.title.rendered}
                        key={navigation.location}
                        readOnly
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        htmlFor='title'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Generated title
                    </label>
                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='title'
                        placeholder='Not Generated'
                        key={navigation.location}
                        defaultValue={
                            tags.length >= 1 ? tags : data.title.rendered
                        }
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        htmlFor='description'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Wordpress description
                    </label>
                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='description'
                        placeholder='No description yet.. '
                        key={navigation.location}
                        defaultValue={data?.description.rendered}
                        readOnly
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        htmlFor='description'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Generated description
                    </label>

                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='description'
                        placeholder='Not Generated'
                        key={navigation.location}
                        defaultValue={
                            description ? description : 'Failed to generate'
                        }
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        htmlFor='title'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Wordpress alt tag
                    </label>
                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='alt-tag'
                        placeholder='No alt tag yet.. '
                        key={navigation.location}
                        defaultValue={data?.description.rendered}
                        readOnly
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        htmlFor='alt-tag'
                        className='mb-2 text-xs font-semibold tracking-wider uppercase'
                    >
                        Generated alt tag
                    </label>

                    <textarea
                        className='h-20 bg-white border-none rounded-lg resize-none'
                        name='alt-tag'
                        placeholder='Not generated'
                        key={navigation.location}
                        defaultValue={
                            description ? description : 'Failed to generate'
                        }
                    />
                </div>
            </div>

            <input name='id' type='hidden' defaultValue={data?.id} />
            <input name='image' type='hidden' defaultValue={data?.source_url} />
            <button
                type='submit'
                value='GENERATE'
                disabled={navigation.state == 'submitting'}
                className=' w-fit  sm:px-12 sm:py-2.5 mx-auto mt-2  text-xs px-6 py-1.5 md:text-sm font-bold text-white uppercase bg-red-500 rounded-lg'
            >
                {navigation.state == 'submitting' ? 'Saving..' : 'Save'}
            </button>
        </>
    );
};
