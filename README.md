# Job Board

A job board website built with Next.js, Tailwind CSS, WorkOS, and MongoDB. This project allows organizations to post job listings and users to browse and favorite jobs. It includes features such as user authentication via WorkOS, job posting, image uploads, and a favorites system.

## Features

- **Job Listings:** Organizations can post and update job listings with detailed descriptions.
- **User Authentication:** Integrated with WorkOS for sign-in and sign-up.
- **Favorites:** Users can add jobs to their favorites and view them on a dedicated page.
- **Responsive Design:** Built using Next.js and Tailwind CSS for a modern, responsive interface.
- **Image Uploads:** Supports uploading job icons and contact photos.
- **Server-Side Rendering:** Utilizes Next.js server components with MongoDB (via Mongoose) for data fetching.
- **ChatGPT Processing:** Optionally process job descriptions with ChatGPT (configurable via a checkbox).
- **AWS Integration:** Uses AWS (e.g., S3) for asset storage.

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- **Node.js:** Latest LTS version is recommended (e.g., Node.js 22.x).
- **pnpm:** Preferred package manager (alternatively, you can use npm or yarn).
- **MongoDB:** A MongoDB instance (local or cloud) with a connection URI.
- **WorkOS Account:** For user authentication and organization management.
- **AWS Account:** For asset storage and integration (e.g., AWS S3).
- **Git:** For version control.
- **Optional:** An OpenAPI Premium account for advanced AI features.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/<your-username>/job-board.git
   cd job-board
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the project root with the following content (adjust values as needed):

   ```env
   MONGO_URI=your_mongodb_connection_uri
   WORKOS_API_KEY=your_workos_api_key
   NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback
   WORKOS_CLIENT_ID=your_workos_client_id
   WORKOS_COOKIE_PASSWORD=your_workos_cookie_password
   S3_ACCESS_KEY=your_s3_key
   S3_SECRET_ACCESS_KEY=your_s3_secret_key
   OPENAI_API_KEY=your_open_api_key

   ```

   For production, update these variables in your deployment platform's environment settings.

### Running the Project Locally

Start the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Building and Running for Production

Build the project:

```bash
pnpm run build
```

Then start the production server:

```bash
pnpm run start
```

### Deployment

This project is ready for deployment on platforms like [Vercel](https://vercel.com/). To deploy:

1. Push your code to a Git repository (e.g., GitHub).
2. Connect your repository to Vercel.
3. Set your production environment variables (such as `MONGO_URI`, `WORKOS_API_KEY`, and `NEXT_PUBLIC_WORKOS_REDIRECT_URI`) in the Vercel dashboard.
4. Vercel will automatically build and deploy your project.

## Project Structure

- **/actions**
  - `chatgptHelper.ts` – Server function to process job descriptions using ChatGPT.
  - `jobActions.ts` – Contains functions to save jobs and manage favorites.
- **/models**
  - `Job.ts` – Mongoose schema and model for job listings.
  - `FavoriteJobs.ts` – Mongoose schema and model for user favorite jobs.
- **/components**
  - `JobRow.tsx` – A component that displays an individual job, with favorite toggle functionality.
  - `Jobs.tsx` – A component that lists multiple jobs.
  - `Hero.tsx` – A simple hero/banner component for the homepage.
  - `ImageUpload.tsx` – A component for uploading images.
  - `TimeAgo.tsx` – A component to display relative time (e.g., "3 days ago").
- **/app**
  - `page.tsx` – Main homepage file.
  - **/favorites/[userId]/**
    - `page.tsx` – Wrapper for the favorites page.
    - `FavoritesContent.tsx` – Server component that fetches and displays a user's favorite jobs.
  - **/show/[jobId]/**
    - `page.tsx` – Single job detail page.
  - **globals.css** – Global styles with Tailwind CSS directives.
- **tailwind.config.ts** – Tailwind CSS configuration.
- **postcss.config.mjs** – PostCSS configuration.
- **next.config.mjs** – Next.js configuration.

## Contributing

Contributions are welcome! Feel free to fork the repository and open a pull request with your improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [WorkOS](https://workos.com/)
- [Mongoose](https://mongoosejs.com/)
- [OpenAI](https://openai.com/)
