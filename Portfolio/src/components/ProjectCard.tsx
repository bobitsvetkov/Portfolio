type ProjectCardProps = {
    title: string;
    description: string;
    demoLink: string;
    image: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, demoLink, image }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <a href={demoLink} className="text-indigo-600 hover:text-indigo-800">View Demo</a>
            </div>
        </div>
    );
};

export default ProjectCard;