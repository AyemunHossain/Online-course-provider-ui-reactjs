import React from 'react'

const CourseLoading = (Components) => {
    debugger;
    return function PostLoadingComponent({isLoading, ...props}){
        if(!isLoading) return <Components {...props} />
        return (
            <p style={{ fontSize:'25px'}}>
                We are waiting for the data to load!...
            </p>
        )
    }
}

export default CourseLoading
